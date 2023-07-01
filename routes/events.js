const express = require('express');

const router = express.Router();

router.get("/events", async (req, res) => {
    res.send('event');
});

module.exports = router;