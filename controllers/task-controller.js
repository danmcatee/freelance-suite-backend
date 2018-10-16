const Task = require('../models/task')

exports.getTasks = (req, res) => {
  Task.find(req.query).exec((err, tasks) => {
    if (err) {
      console.log(err)
      res.status(500).json({error: err.message})
    } else if(tasks == null) {
      res.status(404).json({info: 'No tasks found'})  
    } else {
      res.status(200).json(tasks)
    }
  })
}

exports.getTask = (req, res) => {

  let id = req.params.id

  Task.findOne({ _id: id }, (err, task) => {
    if (err) {
      console.log(err)
      if(err.name === 'CastError') {
        res.status(400).json({error: 'ID ' + id + ' has wrong format'})
      } else {
        res.status(500).json({error: err.message})
      }
    } else if (task == null) {
      res.status(404).json({error: 'Task with ID ' + id + ' not found.'})
    } else {
      res.status(200).json(task)
    }
  })
}

exports.addTask = (req, res) => {
  let newTask = new Task(req.body)

  newTask.save((err, task) => {
    if (err) {
      console.log('Error while saving task: ' + JSON.stringify(newTask))
      console.log(err)
      res.status(400).json({error: err.message})
    } else {
      console.log('Saved task: ' + JSON.stringify(task))
      res.status(201).redirect(301, '/api/task/' + newTask._id)
    }
  })
}

exports.updateTask = (req, res) => {
  let id = req.params.id
  // TODO
  res.send('Not yet implemented')
}

exports.deleteTask = (req, res) => {
  let id = req.params.id

  Task.findOneAndDelete({ _id: id }, (err, taks) => {
    if (err) {
      console.log('Error while deleting task with ID ' + id)
      console.log(err)
      if(err.name === 'CastError') {
        res.status(400).json({error: 'ID ' + id + ' has wrong format'})
      } else {
        res.status(500).json({error: err.message})
      }
    } else if(task == null) {
      res.status(404).json({error: 'Task with ID ' + id + ' not found.'}) 
    } else {
      console.log('Deleted task with ID ' + id)
      res.status(204).send()
    }
  })
}