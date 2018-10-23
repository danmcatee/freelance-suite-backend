const Timestamp = require('../models/timestamp');


/**
 * Calculates total time spent on a task, a project, or a customer.
 * URL parameters: 
 * 1. a task ID, project ID or a customer ID 
 *    (if > 1 given, only the first one will be evaluated)
 * 2. start date [optional]
 * 3. end date [optional]
 * 
 * example URL: /api/stats/totaltime?taskId=5bb0cd1caeca2d21a5eabc34&start=2018-09-10&end=2018-10-20
 */
exports.calculateTotalTimeSpent = (req, res) => {

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

}


