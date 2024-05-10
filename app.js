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
    const data = await sequelize.query("SELECT uid, name, address, gender FROM people", {
        type: QueryTypes.SELECT
    })
    res.json({
        records: data,
        total_record: data.length,
        total_page: 1,
        page: 1,
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

app.get("/family/:uid", async (req, res) => {
    const uid = req.params["uid"] || ""

    //get person
    const person = await sequelize.query("SELECT uid, name, image, address, gender FROM people WHERE uid=?", {
        replacements: [uid],
        type: QueryTypes.SELECT
    })
    //get spouse
    const spouse = await sequelize.query("SELECT uid, name, image, address, gender FROM people WHERE spouse=?", {
        replacements: [uid],
        type: QueryTypes.SELECT
    })
    //get father
    //get mother
    //get children
    const children = await sequelize.query("SELECT uid, name, image, address, gender FROM people WHERE father=? OR mother=?", {
        replacements: [uid, uid],
        type: QueryTypes.SELECT
    })
    person[0]["children"] = children
    person[0]["spouse"] = spouse[0]
    res.json(person[0])
})

app.listen(port)