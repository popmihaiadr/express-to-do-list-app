const express = require('express');
const validator = require('../middlewares/validator');
const taskValidator = require('../validators/task.validators');
const { taskControllers } = require('../controllers');
const checkPermissions = require("../middlewares/checkPermission");

const router = express.Router();

router
    .route('/tasks')
    .post(checkPermissions('WRITER'),validator(taskValidator.addTask), taskControllers.addTask)
    .get(taskControllers.getAllTasks)

    router
    .route('/tasks/:id')
    .put(checkPermissions('WRITER'),validator(taskValidator.updateTask), taskControllers.updateTask)
     .put(checkPermissions('WRITER') , taskControllers.updateTask)
    .delete(checkPermissions('WRITER'),taskControllers.deleteTask)
    .get(taskControllers.getTaskById)
module.exports = router;