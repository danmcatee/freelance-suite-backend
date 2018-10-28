const Timestamp = require('../models/timestamp');
const statsHelper = require('../helper/statistics-helper')


/**
 * Calculates total time in minutes spent on a task, a project (TODO), or a customer (TODO).
 * URL parameters: 
 * 1. a task ID, project ID or a customer ID 
 *    (if > 1 given, the first one will be evaluated)
 * 2. start date [optional]
 * 3. end date [optional]
 * 4. unit [optional] TODO
 */
exports.calculateTotalTimeSpent = (req, res) => {   
    let foundFilterByParam = false
    let dbQuery = {}
    let start, end

    //parse URL parameter
    for(let param in req.query) {
      if(req.query.hasOwnProperty(param)) {
        // TODO param names as constants
        if(!foundFilterByParam && param === 'taskId') {
          dbQuery[param] = req.query[param]
          foundFilterByParam = true
        } 

        if(param === 'start') {
          start = new Date(req.query[param])
          if(start instanceof Date && !isNaN(start)) dbQuery['timestamp'] = { $gte : start }
        } 
        else if(param === 'end') { 
          end = new Date(req.query[param])
          if(end instanceof Date && !isNaN(end)) dbQuery['timestamp'] = { $lte : end }
        } 
      }
    }
    console.log(`DB query: ${JSON.stringify(dbQuery)}`)
  
    Timestamp.find(dbQuery, null, {sort: {timestamp: 'asc'}}).exec((err, timestamps) => {
      if (err) {
        console.log(err)
        res.status(500).json({error: err.message})
      } else if(timestamps == null) {
        res.status(200).json({totaltime : 0})
      } else {
        res.status(200).json({totaltime: statsHelper.calculateTotalTime(timestamps, start, end)})
      }
    })
}

/**
 * Calculates average time spent on a task, a project, or a customer per unit
 * URL parameters: 
 * 1. either a project ID, task ID or customer ID
 * 2. unit: day, week, month (30 days), year
 * 3. start date [optional]
 * 4. end date [optional]
 * 
 * example URL: 
 */
exports.calculateAvgTimeSpent = (req, res) => {
  Timestamp.find(dbQuery, null, {sort: {timestamp: 'asc'}}).exec((err, timestamps) => {
    if (err) {
      console.log(err)
      res.status(500).json({error: err.message})
    } else if(timestamps == null) {
      res.status(200).json({totaltime : 0})
    } else {
      res.status(200).json({totaltime: statsHelper.calculateAverageTime(timestamps, start, end)})
    }
  })
}


