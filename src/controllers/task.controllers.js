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

const updateTask = handleAsync(async (req, res, next) => {
    //to-do use autoincrement and avoid requesting the id in the body
    const {
       title, 
       description,
       status
    } = req.body
    const taskId = req.params.id;
    const task= await taskServices.updateTask(taskId,{
        title, 
        description,
        status
    })

    logger.info(`Task ${task.id} succesully updated!`)
    res.status(200).send(task)
}) 

const deleteTask = handleAsync(async (req, res, next) => {

  
    const taskId = req.params.id;
    const records= (await taskServices.deleteTask (taskId)).countRecordForId;

    logger.info(`Task ${taskId} succesully deleted!`)
    res.status(200).send(' Number of records in db for id: '+ taskId + ' is ' + records)
}) 
const getTaskById = handleAsync(async (req, res, next) => {
    const taskId = req.params.id;
    const result = JSON.stringify(await taskServices.getTaskById(taskId))
    res.send(result)
    
}) 

module.exports = {
    addTask, getTaskById, getAllTasks,deleteTask,updateTask
}