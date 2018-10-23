const Timestamp = require('../models/timestamp')


/**
 * Return timestamps, optionally filtered by given URL parameters.
 * URL parameters: 
 * 1. taskId: a task ID [optional]
 * 2. start: min. date of start timestamps [optional]
 * 3. end: max. date of end timestamps [optional]
 * 
 * example URL: /api/timestamp?taskId=5bb0cd1caeca2d21a5eabc34&start=2018-09-10
 */
exports.getTimestamps = (req, res) => {
  let dbQuery = {}
  for(let param in req.query) {
    
    if(req.query.hasOwnProperty(param)) {
      // TODO param names as constants
      if(param === 'taskId') {
        dbQuery[param] = req.query[param]
      } 
      else if(param === 'start') { // TODO catch parsing errors
        dbQuery['timestamp'] = { $gte : new Date(req.query[param]) }
        dbQuery['isStart'] = true
      } 
      else if(param === 'end') {
        dbQuery['timestamp'] = { $lte : new Date(req.query[param]) }
        dbQuery['isStart'] = false
      } 
    }
  }
  console.log('DB query: ' + JSON.stringify(dbQuery))
  
  Timestamp.find(dbQuery).exec((err, timestamps) => {
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