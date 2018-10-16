const Timestamp = require('../models/timestamp')

exports.getTimestamps = (req, res) => {
  Timestamp.find(req.query).exec((err, timestamps) => {
    if (err) {
      console.log(err)
      res.status(500).json({error: err.message})
    } else if(timestamps == null) {
      res.status(404).json({info: 'No timestamps found'})
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
      if(err.name === 'CastError') {
        res.status(400).json({error: 'ID ' + id + ' has wrong format'})
      } else {
        res.status(500).json({error: err.message})
      }
    } else if (timestamp == null) {
      res.status(404).json({error: 'Timestamp with ID ' + id + ' not found.'})
    } else {
      res.status(200).json(timestamp)
    }
  })
}

exports.addTimestamp = (req, res) => {
  let newTimestamp = new Timestamp(req.body)

  newTimestamp.save((err, timestamp) => {
    if (err) {
      console.log('Error while saving timestamp: ' + JSON.stringify(newTimestamp))
      console.log(err)
      res.status(400).json({error: err.message})
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

  Timestamp.findOneAndDelete({ _id: id }, (err, timestamp) => {
    if (err) {
      console.log('Error while deleting timestamp with ID ' + id)
      console.log(err)
      if(err.name === 'CastError') {
        res.status(400).json({error: 'ID ' + id + ' has wrong format'})
      } else {
        res.status(500).json({error: err.message})
      }
    } else if (timestamp == null) {
      res.status(404).json({error: 'Timestamp with ID ' + id + ' not found.'}) 
    } else {
      console.log('Deleted timestamp with ID ' + id)
      res.status(204).send()
    }
  })
}