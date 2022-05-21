const express = require('express');
const router = express.Router();

//descontruction all the tasks from the controller
const {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
} = require('../controllers/task_controller')

//
router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)
 

module.exports = router;
