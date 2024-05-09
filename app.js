const express = require('express')
const { Sequelize, QueryTypes } = require('sequelize');
const app = express()
const port = 8000

const sequelize = new Sequelize('mysql://root:118806@localhost:3306/family') // Example for postgres

app.get('/', async (req, res) => {
    const data = await sequelize.query("SELECT * FROM people", {
        type: QueryTypes.SELECT
    })
    res.send(data)
})

app.listen(port)