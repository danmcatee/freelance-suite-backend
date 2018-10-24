const express = require('express')
const timestampController = require('../controllers/timestamp-controller')
const router = express.Router()

// get all timestamps or filter by DB attributes with URL parameters
router.get('/', timestampController.getTimestamps)

// get one timestamp by timestamp id
router.get('/:id', timestampController.getTimestamp)

// add new timestamp
router.post('/', timestampController.addTimestamp)

// delete single timestamp by timestamp id
router.delete('/:id', timestampController.deleteTimestamp)

// delete all timestamps
router.delete('/', timestampController.deleteAllTimestamps)

module.exports = router