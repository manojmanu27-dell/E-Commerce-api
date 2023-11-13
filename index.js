const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const VERSION = require("./package.json").version;
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectionDb, closeConenction } = require('./db/dbConnect');
const exitHook = require('async-exit-hook');
const helmet = require('helmet');
console.log("Server is running on port", PORT)

const corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,POST,PUT,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "exposedHeaders": ['token', 'access-token']
}
app.options("*", cors(corsOptions))
app.use(cors(corsOptions))
app.use(cors());
app.disable('x-powered-by');
app.use(helmet.xssFilter());
app.use(helmet.ieNoOpen());
app.use(bodyParser.json({
    limit: '150mb'
}))
app.use(bodyParser.urlencoded({
    limit: '150mb',
    extended: true
}))
app.listen(PORT, () => {
    console.log(`The API is listening on http://localhost:${PORT}`)
})

connectionDb();

app.get('/', (req, res) => {
    res.status(200).send(`The Api Is running on version ${VERSION}`)
})
console.log(process.env.MONGO_DB_USERNAME)
app.get("/login", (req, res) => {
    res.status(200).json({
        message: "This is a TEst"
    })
})

exitHook(() => {
    closeConenction().then(() => console.log("successfully closed from the exit hook"))
})