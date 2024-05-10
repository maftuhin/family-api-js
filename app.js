const express = require('express'), bodyParser = require('body-parser')
const { Sequelize, QueryTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const app = express()
const port = 8000

// const sequelize = new Sequelize('mysql://root:118806@localhost:3306/family')
const sequelize = new Sequelize(
    'mysql://mafb1319_main:8Belas0694s@localhost:3306/mafb1319_family'
)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/person', async (req, res) => {
    const data = await sequelize.query("SELECT uid, name, address FROM people", {
        type: QueryTypes.SELECT
    })
    res.json({
        records: data,
        total_record: data.length,
        total_page: 1,
        next_page: 1
    })
})

app.post("/person", async (req, res) => {
    const uid = uuidv4()
    const name = req.body.name || ""
    const address = req.body.address || ""
    const gender = req.body.gender || null

    const insert = await sequelize.query("insert into people(uid, name, address, gender) value(?,?,?,?)", {
        replacements: [uid, name, address, gender],
        type: QueryTypes.INSERT
    })

    res.json(insert)
})

app.listen(port)