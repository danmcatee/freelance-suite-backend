const express = require('express')
const projectController = require('../controllers/project-controller')
const router = express.Router()

// get all projects
router.get('/', projectController.getAllProjects)

// get one project by project id
router.get('/:id', projectController.getProject)

// get projects by customer id
router.get('/:customerId', projectController.getProjectsByCustomer)

// add new project
router.post('/', projectController.addProject)

// update project
router.patch('/:id', projectController.updateProject)

// delete single project by project id
router.delete('/:id', projectController.deleteProject)

module.exports = router