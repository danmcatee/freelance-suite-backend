const express = require('express')
const customerController = require('../controllers/customer-controller')
const router = express.Router()

// get all customers
router.get('/', customerController.getAllCustomers)

// get one customer by customer id
router.get('/:id', customerController.getCustomer)

// add new customer
router.post('/', customerController.addCustomer)

// update customer
router.patch('/:id', customerController.updateCustomer)

// delete single customer by customer id
router.delete('/:id', customerController.deleteCustomer)

module.exports = router