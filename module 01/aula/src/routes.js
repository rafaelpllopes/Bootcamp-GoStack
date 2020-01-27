const { Router } = require('express')

const routes = Router()

const users = ['Rafael', 'Joelma', 'Ana']

function checkUserExists(req, res, next) {
    if(!req.body.name) {
        return res.status(400).json({ error: 'User name is required' })
    }

    return next()
}

function checkUserInArray(req, res, next) {
    if(!users[req.params.id]) {
        return res.status(400).json({ error: 'User does nor exists' })
    }

    return next()
}

routes.get('/teste', (req, res) => {
    const { nome } = req.query

    let resposta = {}
    resposta.message = 'Hello World!!!'

    if (nome) resposta.nome = `Meu nome é ${nome}`

    return res.json(resposta)
})

routes.route('/users')
    .get((req, res) => {
        let resposta = []
        for (i = 0; i < users.length; i++) {
            resposta.push({
                id: i,
                name: users[i]
            })
        }

        return res.json(resposta)
    })
    .post(checkUserExists, (req, res) => {
        const { name } = req.body

        users.push(name)
        return res.status(201).json({ message: "Usuario cadastrado" })
    })

routes.route('/users/:id')
    .get(checkUserInArray, (req, res) => {
        const { id } = req.params
        const user = {
            id,
            name: users[id]
        }
        return res.json(user)
    })
    .put(checkUserExists, checkUserInArray, (req, res) => {
        const { id } = req.params
        const { name } = req.body

        users[id] = name
        return res.status(200).json({message: "Usuario editado com sucesso"})
    })
    .delete(checkUserInArray, (req, res) => {
        const { id } = req.params

        users.splice(id, 1)
        return res.status(200).json({message: "Usuario deletado com sucesso"})
    })

module.exports = routes