const express = require('express')
const statsController = require('../controllers/statistics-controller')
const router = express.Router();

router.get('/totaltime', statsController.calculateTotalTimeSpent)

router.get('/avgtime', statsController.calculateAvgTimeSpent)

module.exports = router