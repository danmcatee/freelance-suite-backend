const express = require('express')
const projectController = require('../controllers/project-controller')
const router = express.Router()

// get all projects or filter by DB attributes with URL parameters
router.get('/', projectController.getProjects)

// get one project by project id
router.get('/:id', projectController.getProject)

// add new project
router.post('/', projectController.addProject)

// update project
router.patch('/:id', projectController.updateProject)

// delete single project by project id
router.delete('/:id', projectController.deleteProject)

module.exports = router