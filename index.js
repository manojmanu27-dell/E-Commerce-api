const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080
const VERSION = require("./package.json").version
console.log("Server is running on port",PORT)
app.listen(PORT, () => {
    console.log(`The API is listening on http://localhost:${PORT}`)
})

app.get('/', (req, res) => {
    res.status(200).send(`The Api Is running on version ${VERSION}`)
})

app.get("/login", (req, res) => {
    res.status(200).json({
        message: "This is a TEst"
    })
})