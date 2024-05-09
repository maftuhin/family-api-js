const express = require('express')
const port = 8000;

const app = express()

app.get("/", (req, res) => {
    res.send("Hello")
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})