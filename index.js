const express = require("express");
const app = express();
const port = 8080
const VERSION = require("./package.json").version

app.listen(port, (req, res) => {
    console.log(`The API is listening on http://localhost:${port}`)
})

app.get('/', (req, res) => {
    res.status(200).send(`The Api Is running on version ${VERSION}`)
})

app.get("/login", (req, res) => {
    res.status(200).json({
        message: "This is a TEst"
    })
})