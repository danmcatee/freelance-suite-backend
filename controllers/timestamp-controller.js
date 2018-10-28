const Timestamp = require('../models/timestamp')


/**
 * Return timestamps, optionally filtered by given URL parameters.
 * URL parameters: 
 * 1. taskId: only timestamps for this task [optional]
 * 2. start: only timestamps after this date [optional]
 * 3. end: only timestamps before this date [optional]
 */
exports.getTimestamps = (req, res) => {
  let dbQuery = {}
  for(let param in req.query) {
    
    if(req.query.hasOwnProperty(param)) {
      // TODO param names as constants
      if(param === 'taskId') {
        dbQuery[param] = req.query[param]
      } 
      else if(param === 'start') {
        let date = new Date(req.query[param])
        if(date instanceof Date && !isNaN(date)) {
          dbQuery['timestamp'] = { $gte : date }
        } else {
          console.log(`Not able to parse start date ${req.query[param]}`)
        } 
      } else if(param === 'end') {
        let date = new Date(req.query[param])
        if(date instanceof Date && !isNaN(date)) {
          dbQuery['timestamp'] = { $lte : date }
        } else {
          console.log(`Not able to parse end date ${req.query[param]}`)
        } 
      } 
    }
  }
  console.log('DB query: ' + JSON.stringify(dbQuery))
  
  Timestamp.find(dbQuery).exec((err, timestamps) => {
    if (err) {
      console.log(err)
      res.status(500).json({error: err.message}) 
    } else if(timestamps) {
      res.status(200).json(timestamps)
    } else {
      res.status(400)
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

exports.deleteAllTimestamps = (req, res) => {
  Timestamp.deleteMany({}, (err) => {
    if (err) {
      console.log('Error while deleting timestamps')
      console.log(err)
      res.status(500).json({error: err.message})
    } else {
      res.status(204).send()
    }
  })
}