const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const projectProps = require('./utils/project-properties.json');
const indexRoute = require('./routes/index')
const userRoute = require('./routes/user')

let dbCon = projectProps.databaseConnection;
mongoose.connect(`mongodb://${dbCon.username}:${dbCon.password}@${dbCon.uri}`, { useNewUrlParser: true })
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))


const port = 8000
const app = express()
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use('/', indexRoute)
app.use('/api/user', userRoute)


// listen for requests
app.listen(port, () => {
  console.log("Server is listening on port " + port)
})
