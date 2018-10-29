const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema({
  title: { type: String, required: true, maxlength: 100, trim: true },
  description: { type: String, maxlength: 500 },
  createdOn: { type: Date, default: Date.now },
  projectId: { type: Schema.Types.ObjectId, required: true, ref: 'Project' }
})

module.exports = mongoose.model('Task', TaskSchema)