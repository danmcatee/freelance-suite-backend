exports.logRequest = (req, res, next) => {
  console.log(new Date() + ': request to ' + req.originalUrl)
  next()
}