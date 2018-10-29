const Timestamp = require('../models/timestamp');
const statsHelper = require('../helper/statistics-helper')


/**
 * Calculates total time in minutes spent on a task, a project (TODO), or a customer (TODO).
 * URL parameters: 
 * 1. a task ID, project ID or a customer ID 
 *    (if > 1 given, the first one will be evaluated)
 * 2. start date [optional]
 * 3. end date [optional]
 */
exports.calculateTotalTimeSpent = (req, res) => {
  let params = parseUrlParameter(req.query)
  let dbQuery = createDbQuery(params)

  Timestamp.find(dbQuery, null, { sort: { timestamp: 'asc' } }).exec((err, timestamps) => {
    if (err) {
      console.log(err)
      res.status(500).json({ error: err.message })
    } else if (timestamps == null || timestamps.length === 0) {
      res.status(200).json({ totaltime: 0 })
    } else {
      res.status(200).json({ totaltime: statsHelper.calculateTotalTime(timestamps, params.start, params.end) })
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
 * If no start/end date given the start date of first timestamp is taken
 * (TODO order timestamps by timedate)
 */
exports.calculateAvgTimeSpent = (req, res) => {  
  let params = parseUrlParameter(req.query)
  let dbQuery = createDbQuery(params)
  

  Timestamp.find(dbQuery, null, {sort: {timestamp: 'asc'}}).exec((err, timestamps) => {
    if (err) {
      console.log(err)
      res.status(500).json({error: err.message})
    } else if(timestamps == null || timestamps.length === 0) {
      res.status(200).json({avgtime : 0})
    } else {
      res.status(200).json({avgtime: statsHelper.calculateAverageTime(timestamps, params.start, params.end, params.unit)})
    }
  })
}

function parseUrlParameter(urlParams) {
  let params = {}

  let foundFilterByParam = false
  let start, end, unit = 'week'
  const timeUnits = new Set(['day', 'week', 'month', 'year'])

  for (let param in urlParams) {
    if (urlParams.hasOwnProperty(param)) {
      // TODO param names as constants
      if (!foundFilterByParam && param === 'taskId') {
        params[param] = urlParams[param]
        foundFilterByParam = true
      }

      if (param === 'start') {
        start = new Date(urlParams[param])
        if (start instanceof Date && !isNaN(start)) {
          params[param] = start
        } else {
          console.log(`Not able to parse start date ${urlParams[param]}`)
        }
      }
      else if (param === 'end') {
        end = new Date(urlParams[param])
        if (end instanceof Date && !isNaN(end)) {
          params[param] = end
        } else {
          console.log(`Not able to parse end date ${urlParams[param]}`)
        }
      }
      else if (param === 'unit') {
        if(timeUnits.has(urlParams[param])) {
          params[param] = urlParams[param]
        }
      }
    }
  }
  console.log(`Parsed URL parameters: ${JSON.stringify(params)}`)
  return params

}

function createDbQuery(params) {
  let dbQuery = {}

  for(param in params) {
    if(params.hasOwnProperty(param)) {
      if (param === 'taskId') {
        dbQuery[param] = params[param]
      }
      else if (param === 'start') {
        dbQuery['timestamp'] = { $gte: params[param] }
      }
      else if (param === 'end') {
        dbQuery['timestamp'] = { $lte: params[param] }
      }
    }
  }
  console.log(`DB query: ${JSON.stringify(dbQuery)}`)
  return dbQuery
}

