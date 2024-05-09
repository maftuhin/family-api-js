const express = require('express')
const mysql = require('mysql2');
const port = 8000;
const app = express()

const connection = mysql.createConnection(
    'mysql://mafb1319_main:8Belas0694s@localhost:3306/mafb1319_family'
);
// const connection = mysql.createConnection(
//     'mysql://root:118806@localhost:3306/family'
// );
connection.addListener('error', (err) => {
    console.log(err);
});

app.get("/", (req, res) => {
    res.send("Index")
})

app.get("/user", async (req, res) => {
    const q = req.query["q"] || ""
    const sql = "SELECT * FROM `people` WHERE `name` LIKE '%" + q + "%'"
    connection.query(sql, (err, rows) => {
        if (err instanceof Error) {
            res.send(err)
            return;
        }
        res.send(rows)
    })
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})