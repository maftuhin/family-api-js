
const { Sequelize, QueryTypes, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('mysql://root:118806@localhost:3306/family')
const sequelize = new Sequelize(
    'mysql://mafb1319_main:8Belas0694s@localhost:3306/mafb1319_family'
)

const modelDefiners = [
    require("./models/people.model"),
    require("./models/user.model")
]

for (const modelDefiner of modelDefiners){
    modelDefiner(sequelize)
}

module.exports = sequelize