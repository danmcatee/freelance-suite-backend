const express = require('express')
const router = express.Router()

// zum Testen
router.get('/', (req, res) => {
  res.status(200).json({ 'msg': 'hello world' })
})



module.exports = router