const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CustomerSchema = new Schema({
  name: { type: String, required: true, maxlength: 100, trim: true },
  description: { type: String, maxlength: 300 },
  createdOn: { type: Date, default: Date.now },
  modifiedOn: Date,
  email: String,
  phone: String,
  address: { // TODO separate schema
    street: String,
    houseNo: String,
    additionalInfo: String,
    postalCode: String,
    town: String,
    state: String,
    country: String
  }
})

module.exports = mongoose.model('Customer', CustomerSchema)