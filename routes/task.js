const express = require('express')
const taskController = require('../controllers/task-controller')
const router = express.Router()

// get all tasks
router.get('/', taskController.getAllTasks)

// get one task by task id
router.get('/:id', taskController.getTask)

// get tasks by project id
router.get('/:projectId', taskController.getTasksByProject)

// add new task
router.post('/', taskController.addTask)

// update task
router.patch('/:id', taskController.updateTask)

// delete single task by task id
router.delete('/:id', taskController.deleteTask)

module.exports = router