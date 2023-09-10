const { Api500Error, BaseError } = require('../utils/errors');
const tasksDb = require('../data-access/tasks.db');
const logger = require('../utils/logger');

const getAllTasks = async () => {
    try {
        const tasks = await tasksDb.findAll()
        return tasks
    } catch(error) {
        logger.error(error)
        throw new Api500Error('Failed searching tasks')
    }
}
const getTaskById = async (id) => {
    try {
        const task = await tasksDb.findById(id);
        if (!task) {
            logger.error(`Task with id ${id} not found`)
            throw new BaseError('Task not found')
        }
        return task
    } catch(error) {
        logger.error(error)
        throw new Api500Error(`Failed searching task by id: ${id}`)
    }
}

const deleteTask = async (id) => {
    try {
        const task = await tasksDb.findById(id);
        if (!task) {
            logger.error(`Task with id ${id} not found`)
            throw new BaseError('Task not found')
        } else 
        {
           const countRecordForId= await tasksDb.deleteOne(id);
           return {
           countRecordForId 
         }

        }
    } catch(error) {
        logger.error(error)
        throw new Api500Error(`Failed deleting task by id: ${id}`)
    }
}

const checkDuplicateID = async (id) => {
    try {
        const task = await tasksDb.findById(id)
        if (task) {
            throw new BaseError('ID already in use')
        }
    } catch(error) {
        logger.error(`Failed checking forID. ${error}`)
        throw new Api500Error(error)
    }
}

const createTask = async (taskData) => {
    try {
        await checkDuplicateID(taskData.id)
        const task = await tasksDb.insertTask(taskData)
        const { id,title, description, status } = task
        return {
           id,
           title,
           description,
            status, 
        }
    } catch(error) {
        logger.error(error)
        throw new Api500Error(error.message)
    }
}
const updateTask = async (taskId,taskData) => {
    try {
        
        const task = await tasksDb.findOneAndUpdate(taskId, taskData);
        const { id, title, description, status } = task
        return {
           id,
           title,
           description,
        status, 
        }
    } catch(error) {
        logger.error(error)
        throw new Api500Error(error.message)
    }
}
module.exports = {
     createTask, getAllTasks, getTaskById, updateTask, deleteTask
}