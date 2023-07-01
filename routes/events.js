const express = require('express');
const dbo = require('../db');
const {ObjectId} = require("mongodb");
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
})

const router = express.Router();

router.get("/events", async (req, res) => {
    let database = await dbo.getDatabase();
    const collection = database.collection('event').find().sort({$natural : -1}).limit(5);
    let event = await collection.toArray();

    res.send(event);
});

router.get("/events/:id", async (req, res) => {
    let database = await dbo.getDatabase();
    const collection = database.collection('event');
    let response = await collection.findOne({  _id: new ObjectId(req.params.id) });
    
    res.send(response);
});

router.post("/events", upload.single('file'), async (req, res) => {
    req.body['file'] = `http://localhost:5000/img/${req.file.filename}`;
    let database = await dbo.getDatabase();
    const collection = database.collection('event');
    let response = await collection.insertOne(req.body);

    res.send(response)
});

router.put("/events/:id", async (req, res) => {
    let database = await dbo.getDatabase();
    const collection = database.collection('event');
    let response = await collection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });

    res.send(response);
});

router.delete("/events/:id", async (req,res) => {
    let database = await dbo.getDatabase();
    const collection = database.collection('event');
    let response = await collection.deleteOne({ _id: new ObjectId(req.params.id) });

    res.send(response);
});

module.exports = router;