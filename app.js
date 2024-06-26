const express = require('express'), bodyParser = require('body-parser')
const sequelize = require("./connection")
const userController = require("./controllers/person.controller")
const authController = require("./controllers/auth.controller")
const cors = require('cors')

const app = express()
const port = 3000

async function init() {
    sequelize.authenticate()
}
init()
app.use(cors({ origin: '*' }))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    res.send("HELLO")
})

app.post("/login", authController.login)

app.get("/person", userController.searchPerson)
app.post("/person", userController.createPerson)
app.get("/person/:uid", userController.personDetail)
app.post("/person/:uid", userController.updatePerson)

app.get("/silsilah/:uid", userController.webTree)

app.listen(port)