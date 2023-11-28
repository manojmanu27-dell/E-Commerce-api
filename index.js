const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const VERSION = require("./package.json").version;
const bodyParser = require('body-parser');
const cors = require('cors');
const { closeConenction } = require('./db/dbConnect');
const exitHook = require('async-exit-hook');
const helmet = require('helmet');
console.log("Server is running on port", PORT)
const router = require('./routes')
const config = require("config");

console.log(config.test)

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
app.disable('x-powered-by'); // For Hiding the service provider that we are using i.e., express
app.use(helmet.xssFilter()); // For Extra security protection
app.use(helmet.ieNoOpen()); // For Extra security protection
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


app.get('/', (req, res) => {
    res.status(200).send(`The Api Is running on version ${VERSION}`)
})

app.use('/auth',router.auth)

exitHook(() => {
    closeConenction().then(() => console.log("successfully closed from the exit hook"))
})