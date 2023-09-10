const { trace } = require('../../app')
const { taskServices } = require('../services')
const handleAsync = require('../utils/handleAsync')
const logger = require('../utils/logger')

const addTask = handleAsync(async (req, res, next) => {
    //to-do use autoincrement and avoid requesting the id in the body
    const {id,
       title, 
       description,
       status
    } = req.body

    const task= await taskServices.createTask({
        id,
        title, 
        description,
        status
    })

    logger.info(`Task ${task.id} created!`)
    res.status(201).send(task)
}) 

const getAllTasks = handleAsync(async (req, res, next) => {
    const result =JSON.stringify( await taskServices.getAllTasks())
    
    res.send(result)
    
}) 


const getTaskById = handleAsync(async (req, res, next) => {
    const taskId = req.params.id;
    const result = JSON.stringify(await taskServices.getTaskById(taskId))
    res.send(result)
    
}) 

module.exports = {
    addTask, getTaskById, getAllTasks
}