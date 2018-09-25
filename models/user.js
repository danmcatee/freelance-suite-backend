const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: { type: String, required: true },
    signupDate: { type: Date, default: Date.now }

})

module.exports = mongoose.model('User', UserSchema)