const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TimestampSchema = new Schema({
  isStart: { type: Boolean, required: true, default: true },
  timestamp: { type: Date, required: true, default: Date.now },
  taskId: { type: Schema.Types.ObjectId, required: true }
})

module.exports = mongoose.model('Timestamp', TimestampSchema)