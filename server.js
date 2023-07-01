const express = require('express');
const bodyParser = require('body-parser');

// routes
const eventRoutes = require('./routes/events');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use("/api", eventRoutes);

app.get("/",(req,res)=>{
    res.send('Home Page')
})

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
