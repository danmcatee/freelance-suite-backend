const Timestamp = require('../models/timestamp')

exports.getAllTimestamps = (req, res) => {
  Timestamp.find().exec((err, timestamps) => {
    if (err) {
      console.log(err)
      res.status(400).send('Error while getting timestamps')
    } else {
      res.status(200).json(timestamps)
    }
  })
}

exports.getTimestamp = (req, res) => {
  let id = req.params.id

  Timestamp.findOne({ _id: id }, (err, timestamp) => {
    if (err) {
      console.log(err)
      res.status(400).send('Error while trying to get timestamp with ID ' + id)
    }
    if (timestamp == null) {
      res.status(404).send('Timestamp with ID ' + id + ' not found.')
    } else {
      res.status(200).json(timestamp)
    }
  })
}

exports.getTimestampsByTask = (req, res) => {
  let taskId = req.params.taskId

  Timestamp.find({ taskId: taskId }, (err, timestamps) => {
    if (err) {
      console.log(err)
      res.status(500).send('Error while trying to get timestamp for task with ID ' + taskId)
    }
    if (timestamps == null) {
      res.status(404).send('No timestamp for task with ID ' + taskId + ' found.')
    } else {
      res.status(200).json(timestamps)
    }
  })
}

exports.addTimestamp = (req, res) => {
  let newTimestamp = new Timestamp(req.body)

  newTimestamp.save((err, timestamp) => {
    if (err) {
      console.log('Error while saving timestamp: ' + JSON.stringify(newTimestamp))
      console.log(err)
      res.status(400).send('Error while saving timestamp')
    } else {
      console.log('Saved timestamp: ' + JSON.stringify(timestamp))
      res.status(201).redirect(301, '/api/timestamp/' + newTimestamp._id)
    }
  })
}

exports.updateTimestamp = (req, res) => {
  let id = req.params.id
  // TODO
  res.send('Not yet implemented')
}

exports.deleteTimestamp = (req, res) => {
  let id = req.params.id

  Timestamp.deleteOne({ _id: id }, (err) => {
    if (err) {
      console.log('Error while deleting timestamp with ID ' + id)
      console.log(err)
      res.status(500).send('Error while deleting timestamp')
    } else {
      console.log('Deleted timestamp with ID ' + id)
      res.status(204).send()
    }
  })
}