const express = require('express')
const routes = require('../routes')

const app = express()
let counter = 0

app.set('port', 3000)
app.use(express.json())
app.use((req, res, next) => {
    counter++
    console.log(`Requests: ${counter}`)
    return next()
})

app.use(routes)

module.exports = app