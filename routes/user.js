const express = require('express')
const userController = require('../controllers/user-controller')
const router = express.Router()

// middleware function that logs path and time of request
router.use(userController.logRequest)

// get all users
router.get('/', userController.getAllUsers)

// get one user by user id
router.get('/:id', userController.getUser)

// add new user
router.post('/', userController.registerUser)

// update user
router.patch('/:id', userController.updateUser)

// delete single user by user id
router.delete('/:id', userController.deleteUser)

module.exports = router