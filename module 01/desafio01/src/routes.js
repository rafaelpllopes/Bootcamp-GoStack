const { Router } = require('express')
const textToArray = require('./helpers/text-to-array')
const findIndexById = require('./helpers/find-index-id')

const routes = Router()

const projects = []

function checkIdExists(req, res, next)  {
    const { id } = req.params

    const index = findIndexById(id, projects)

    if(index === -1) {
        return res.status(400).json({
            message: "Id is not exist"
        })
    }

    return next()
}

routes.route('/projects')
    .get((req, res) => {
        return res.status(200).json(projects)
    })
    .post((req, res) => {
        const { id, title, tasks } = req.body
        
        projects.push({id, title, tasks: textToArray(tasks)})

        return res.status(201).json({ message: 'project add' })
     })

routes.route('/projects/:id')
    .put(checkIdExists, (req, res) => {
        const { id } = req.params
        const { title, tasks } = req.body

        const index = findIndexById(id, projects)

        projects[index] = {
            id,
            title,
            tasks: textToArray(tasks)
        }

        return res.status(200).json({ message: 'Modifed' })
    })
    .delete(checkIdExists, (req, res) => {
        const { id } = req.params

        const index = findIndexById(id, projects)

        projects.splice(index, 1)
        
        return res.json({message: 'project removed'})
    })

    routes.post('/projects/:id/tasks', checkIdExists, (req, res) => {
        const { id } = req.params
        const { title } = req.body

        const index = findIndexById(id, projects)

        projects[index] = {
            id: projects[index].id,
            title: projects[index.title],
            tasks: [...projects[index].tasks, title]
        }        

        return res.status(200).json({ message: `created` })
    })

module.exports = routes