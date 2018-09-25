const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const index = require('./routes/index')
const user = require('./routes/user')

// ### Insert personal DB username and password ###
mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds215093.mlab.com:15093/freelance-suite-db', { useNewUrlParser: true })
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise
//Get the default connection
var db = mongoose.connection
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'))


const port = 8000
const app = express()
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use('/', index)
app.use('/api/user', user)


// listen for requests
app.listen(port, () => {
    console.log("Server is listening on port " + port)
})
