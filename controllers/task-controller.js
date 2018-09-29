const Task = require('../models/task')

exports.getAllTasks = (req, res) => {
  Task.find().exec((err, tasks) => {
    if (err) {
      console.log(err)
      res.status(400).send('Error while getting tasks')
    } else {
      res.status(200).json(tasks)
    }
  })
}

exports.getTasksByProject = (req, res) => {
  let projectId = req.params.projectId

  Task.find({ projectId: projectId }, (err, tasks) => {
    if (err) {
      console.log(err)
      res.status(500).send('Error while trying to get task for project with ID ' + projectId)
    }
    if (tasks == null) {
      res.status(404).send('No task for project with ID ' + projectId + ' found.')
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
      res.status(400).send('Error while trying to get task with ID ' + id)
    }
    if (task == null) {
      res.status(404).send('Task with ID ' + id + ' not found.')
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
      res.status(400).send('Error while saving task')
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

  Task.deleteOne({ _id: id }, (err) => {
    if (err) {
      console.log('Error while deleting task with ID ' + id)
      console.log(err)
      res.status(500).send('Error while deleting task')
    } else {
      console.log('Deleted task with ID ' + id)
      res.status(204).send()
    }
  })
}