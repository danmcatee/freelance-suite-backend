const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
  title: { type: String, required: true, maxlength: 100, trim: true },
  description: { type: String, maxlength: 300 },
  createdOn: { type: Date, default: Date.now },
  customerId: { type: Schema.Types.ObjectId, required: true }
})

module.exports = mongoose.model('Project', ProjectSchema)