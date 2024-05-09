import mysql from "mysql2/promise"
import express from "express"
const app = express()

// Create the connection to database
// const connection = await mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'family',
//     password: "118806"
// });

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'mafb1319_main',
    database: 'mafb1319_family',
    password: "8Belas0694s"
});

app.get("/", (req, res) => {
    res.send("Index")
})

app.get("/user", async (req, res) => {
    const q = req.query["q"] || ""
    const sql = "SELECT id, uid, name, address FROM `people` WHERE `name` LIKE '%" + q + "%'"
    const [rows, field] = await connection.query(sql)
    res.json({
        records: rows
    })
})

app.get("/family/:uid", async (req, res) => {
    const person = await connection.query("select * from people LIMIT 1");
    res.send(person)
})
app.listen()