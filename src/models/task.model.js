const { required } = require('@hapi/joi');
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique:true,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
   status: {
        type: String,
        enum: ['PENDING', 'COMPLETED'],
        default: 'PENDING',
        required: true,
    }
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;

