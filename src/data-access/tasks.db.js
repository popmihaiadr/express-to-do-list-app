const Task = require('../models/task.model')

const findAll = async () => {
    return await Task.find()
}

const findById = async (id) => {
    return await Task.findOne({id: id}).clone()
}

const findByEmail = async (email) => {
    return await Task.findOne({email: email}).clone()
}

const insertTask = async (TaskData) => {
    return await Task.create({ ...TaskData })
}

module.exports = {
    findAll,
    findById,
    findByEmail,
    insertTask
}