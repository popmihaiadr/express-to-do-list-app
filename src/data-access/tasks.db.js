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

const findOneAndUpdate = async (id,TaskData) => {
    await Task.findOneAndUpdate({id: id},TaskData);
    return await Task.findOne({id: id}).clone()
}
const deleteOne = async (id) => {
    await Task.deleteOne({id: id});
    return await Task.countDocuments({id: id});
}

module.exports = {
    findAll,
    findById,
    findByEmail,
    insertTask,
    findOneAndUpdate, deleteOne
}