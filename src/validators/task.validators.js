const Joi = require('@hapi/joi');

const addTask = Joi.object({
    id: Joi.number().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().valid('PENDING', 'COMPLETED').required()
})

const updateTask = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().valid('PENDING', 'COMPLETED').required()

})


module.exports = {
    addTask,updateTask
}