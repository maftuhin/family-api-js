const sequelize = require("../connection")
const Sequelize = require("sequelize");
const { v4: uuidv4 } = require('uuid');
const Op = Sequelize.Op;

async function searchPerson(req, res) {
    const q = req.query["q"] || ""
    const page = parseInt(req.query["page"] || 1)
    const perPage = parseInt(req.query["limit"] || 10)
    const offset = (page - 1) * perPage
    await sequelize.models.people.findAndCountAll({
        where: {
            name: {
                [Op.like]: `%${q}%`
            },
        },
        attributes: ['uid', 'name', 'address', 'gender'],
        order: [['name', 'ASC']],
        limit: perPage,
        offset: offset,
    }).then(async (result) => {
        const nextPage = (result.rows.length == perPage) ? page + 1 : null
        const totalPage = Math.ceil(result.count / perPage)
        res.json({
            records: result.rows,
            total_record: result.length,
            total_page: totalPage,
            page: page,
            next_page: nextPage
        })
    })
}

async function createPerson(req, res) {
    const uid = uuidv4()
    const name = req.body.name || null
    const address = req.body.address || ""
    const gender = req.body.gender || null
    const father = req.body.father || null
    const mother = req.body.mother || null
    const spouse = req.body.spouse || null

    if (spouse != null) {
        await addSpouse(spouse, uid)
    }

    await sequelize.models.people.create({
        uid: uid,
        name: name,
        address: address,
        gender: gender,
        father: father,
        mother: mother,
        spouse: spouse
    }).then(async (result) => {
        res.json(result)
    }).catch((error) => {
        res.status(500).json(error)
    })
}

async function addSpouse(uid, spouse) {
    await sequelize.models.people.update({
        spouse: spouse
    }, {
        where: {
            uid: uid
        }
    })
}

async function updatePerson(req, res) {
    const uid = req.params["uid"] || ""
    const name = req.body.name || ""
    const address = req.body.address || ""
    const gender = req.body.gender || null
    const father = req.body.father || null
    const mother = req.body.mother || null
    const spouse = req.body.spouse || null

    await sequelize.models.people.update({
        name: name,
        address: address,
        gender: gender,
        father: father,
        mother: mother,
        spouse: spouse
    }, {
        where: {
            uid: uid
        }
    }).then(async (result) => {
        res.json({
            message: "success"
        })
    }).catch((error) => {
        res.json(error)
    })
}

async function personDetail(req, res) {
    const uid = req.params["uid"] || ""
    const attr = ['uid', 'name', 'image', 'gender']

    //get person
    var person = await sequelize.models.people.findOne({ where: { uid: uid } })
    //get spouse
    const spouse = await sequelize.models.people.findOne({ where: { uid: person.spouse }, attributes: attr })
    //get father
    const father = await sequelize.models.people.findOne({ where: { uid: person.father }, attributes: attr })
    //get mother
    const mother = await sequelize.models.people.findOne({ where: { uid: person.mother }, attributes: attr })
    //get children
    const childrens = await sequelize.models.people.findAll({
        where: {
            [Op.or]: [{ father: uid }, { mother: uid }]
        },
        attributes: attr
    })
    //get brothers
    const brothers = await sequelize.models.people.findAll({
        where: {
            father: person.father || "",
            mother: person.mother || "",
            [Op.not]: {
                uid: uid
            }
        },
        attributes: attr
    })

    person.spouse = spouse
    person.father = father
    person.mother = mother
    const data = person.get({ plain: true })
    data.brothers = brothers
    data.children = childrens

    res.json(data)
}

module.exports = {
    searchPerson,
    createPerson,
    personDetail,
    updatePerson
}