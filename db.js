const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

async function getDatabase(){
    const client = await MongoClient.connect("mongodb://localhost:27017/");

    database = client.db('api');
    
    if (!database) {
        console.log('Database not connected')
    }

    return database;
}

module.exports = { getDatabase };