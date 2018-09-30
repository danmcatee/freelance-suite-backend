const express = require('express')
const taskController = require('../controllers/task-controller')
const router = express.Router()

// get all tasks or filter by DB attributes with URL parameters
router.get('/', taskController.getTasks)

// get one task by task id
router.get('/:id', taskController.getTask)

// add new task
router.post('/', taskController.addTask)

// update task
router.patch('/:id', taskController.updateTask)

// delete single task by task id
router.delete('/:id', taskController.deleteTask)

module.exports = router