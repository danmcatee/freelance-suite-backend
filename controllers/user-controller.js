const User = require('../models/user')

exports.getAllUsers = (req, res) => {
  User.find().exec((err, users) => {
    if (err) {
      console.log(err)
      res.status(500).json({error: err.message})
    } else {
      res.status(200).json(users)
    }
  })
}

exports.getUser = (req, res) => {

  let id = req.params.id

  User.findOne({ _id: id }, (err, user) => {
    if (err) {
      console.log(err)
      if(err.name === 'CastError') {
        res.status(400).json({error: 'ID ' + id + ' has wrong format'})
      } else {
        res.status(500).json({error: err.message})
      }
    } else if (user == null) {
      res.status(404).json({error: 'User with ID ' + id + ' not found.'})
    } else {
      res.status(200).json(user)
    }
  })
}

exports.registerUser = (req, res) => {
  let newUser = new User(req.body)

  newUser.save((err, user) => {
    if (err) {
      console.log('Error while saving user: ' + JSON.stringify(newUser))
      console.log(err)
      res.status(400).json({error: err.message})
    } else {
      console.log('Saved user: ' + JSON.stringify(user))
      res.status(201).redirect(301, '/api/user/' + newUser._id)
    }
  })
}

exports.updateUser = (req, res) => {
  let id = req.params.id
  // TODO
  res.send('Not yet implemented')
}

exports.deleteUser = (req, res) => {
  let id = req.params.id

  User.findOneAndDelete({ _id: id }, (err, user) => {
    if (err) {
      console.log('Error while deleting user with ID ' + id)
      console.log(err)
      if(err.name === 'CastError') {
        res.status(400).json({error: 'ID ' + id + ' has wrong format'})
      } else {
        res.status(500).json({error: err.message})
      }
    } else if (user == null) {
      res.status(404).json({error: 'User with ID ' + id + ' not found.'}) 
    } else {
      console.log('Deleted user with ID ' + id)
      res.status(204).send()
    }
  })
}

