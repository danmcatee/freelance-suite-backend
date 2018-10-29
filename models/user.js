const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: { type: String, required: true, maxlength: 15, trim: true  },
  email: { type: String, required: true },
  password: { type: String, required: true },
  signupDate: { type: Date, default: Date.now },
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
})

module.exports = mongoose.model('User', UserSchema)