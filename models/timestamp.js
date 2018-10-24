const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * startId: a reference to the start timestamp if document is an end timestamp; 
 *          is null, if document is a start timestamp
 * timestamp: current point in time
 * taskId: the ID of the task this timestamp belongs to
 */
const TimestampSchema = new Schema({
  startId: { type: Schema.Types.ObjectId },
  timestamp: { type: Date, required: true, default: Date.now },
  taskId: { type: Schema.Types.ObjectId, required: true }
})

module.exports = mongoose.model('Timestamp', TimestampSchema)