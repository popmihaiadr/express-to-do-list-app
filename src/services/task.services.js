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
        const { id, description, status } = task
        return {
           id,
           description,
            status, 
        }
    } catch(error) {
        logger.error(error)
        throw new Api500Error(error.message)
    }
}

module.exports = {
     createTask, getAllTasks, getTaskById
}