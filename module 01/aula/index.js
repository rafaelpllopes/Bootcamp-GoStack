const express = require('express')
const routes = require('./src/routes')

const server = express()

server.use(express.json())

server.use((req, res, next) => {
    console.log(`Metodo: ${req.method}, URL: ${req.url}`)
    return next()
})

server.use(routes)


server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})

