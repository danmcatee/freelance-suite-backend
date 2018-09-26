const express = require('express')
const User = require('../models/user')
const router = express.Router()

// middleware test
router.use((req, res, next) => {
  console.log('Request to ' + req.originalUrl + ' on ' + new Date())
  next()
})

// get all users
router.get('/', (req, res) => {
  User.find().exec((err, users) => {
    if (err) {
      console.log(err)
      res.status(400).send('Error while getting users')
    } else {
      res.status(200).json(users)
    }
  })
})

// get one user
router.get('/:id', (req, res) => {

  let id = req.params.id

  User.findOne({ _id: id }, (err, user) => {
    if (err) {
      console.log(err)
      res.status(400).send('Error while trying to get user with ID ' + id)
    }
    if (user == null) {
      res.status(404).send('User with ID ' + id + ' not found.')
    } else {
      res.status(200).json(user)
    }
  })
})

// add new user
router.post('/', (req, res) => {
  let newUser = new User(req.body)

  newUser.save((err, user) => {
    if (err) {
      console.log('Error while saving user: ' + JSON.stringify(newUser))
      console.log(err)
      res.status(400).send('Error while saving user')
    } else {
      console.log('Saved user: ' + JSON.stringify(user))
      res.status(201).redirect(301, '/api/user/' + newUser._id)
    }
  })
})

// update user
router.patch('/:id', (req, res) => {
  let id = req.params.id
  // TODO
})

// delete user
router.delete('/:id', (req, res) => {
  let id = req.params.id

  User.deleteOne({ _id: id }, (err) => {
    if (err) {
      console.log('Error while deleting user with ID ' + id)
      console.log(err)
      res.status(500).send('Error while deleting user')
    } else {
      console.log('Deleted user with ID ' + id)
      res.status(204).send()
    }
  })
})



module.exports = router