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

router.post("/events", upload.single('file'), async (req, res) => {
    req.body['file'] = `http://localhost:5000/img/${req.file.filename}`;
    let database = await dbo.getDatabase();
    const collection = database.collection('event');
    let response = await collection.insertOne(req.body);

    res.send(response)
});

module.exports = router;