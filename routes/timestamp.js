const express = require('express')
const timestampController = require('../controllers/timestamp-controller')
const router = express.Router()

// get all timestamps
router.get('/', timestampController.getAllTimestamps)

// get one timestamp by timestamp id
router.get('/:id', timestampController.getTimestamp)

// get timestamps by task id
router.get('/:taskId', timestampController.getTimestampsByTask)

// add new timestamp
router.post('/', timestampController.addTimestamp)

// update timestamp
router.patch('/:id', timestampController.updateTimestamp)

// delete single timestamp by timestamp id
router.delete('/:id', timestampController.deleteTimestamp)

module.exports = router