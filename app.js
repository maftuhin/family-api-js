const express = require('express')
const { Sequelize, QueryTypes } = require('sequelize');
const app = express()
const port = 8000

// const sequelize = new Sequelize('mysql://root:118806@localhost:3306/family')
const sequelize = new Sequelize(
    'mysql://mafb1319_main:8Belas0694s@localhost:3306/mafb1319_family'
)

app.get('/', async (req, res) => {
    const data = await sequelize.query("SELECT * FROM people", {
        type: QueryTypes.SELECT
    })
    res.send(data)
})

app.listen(port)