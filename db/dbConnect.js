require('dotenv').config();
const mongoose = require('mongoose');
const userName = process.env.MONGO_DB_USERNAME;
const pwd = process.env.MONGO_DB_PASSWORD;
console.log("before deleting the pwd", userName, pwd)
const uri = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.ttxjbl2.mongodb.net/?retryWrites=true&w=majority`;
const connectionDb = async () => {
    try {
        await mongoose.connect(uri, {
            maxPoolSize: 10
        })
        console.log("connected to db successfully")
    } catch (error) {
        console.log("error occured while conencting to db", error)
    }

    // .finally(() => {
    //     // Close the connection after creating the document
    //     mongoose.connection.close();
    //   });
}
const closeConenction = async () => {
    console.log("this func is called")
    mongoose.disconnect()

}

module.exports = { connectionDb, closeConenction }

mongoose.connection.on('connection', () => {
    console.log("connection is aquired")
})
mongoose.connection.on('error', (err) => {
    console.error("error while connecting to db", err)
})
mongoose.connection.on('disconnected', (connection) => {
    console.log("connection is disconencted")
})
