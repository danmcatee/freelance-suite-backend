exports.logRequest = (req, res, next) => {
  console.log('Incomming request to ' + req.originalUrl + ' on ' + new Date())
  next()
}