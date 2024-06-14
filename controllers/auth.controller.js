const sequelize = require('../connection')

async function login(req, res) {
    const username = req.body["username"] || ""
    const password = req.body["password"] || ""

    await sequelize.models.user.findOne(
        {
            where: {
                username: username,
                password: password
            }
        }
    ).then((result) => {
        if (result == null) {
            res.status(500)
            res.json({message: "login failed"})
            return
        }
        res.json(result)
    }).catch((error) => {
        res.json(error)
    })
}

module.exports = {
    login
}