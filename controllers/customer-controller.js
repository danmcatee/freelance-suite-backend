const Customer = require('../models/customer')

exports.getAllCustomers = (req, res) => {
  Customer.find().exec((err, customers) => {
    if (err) {
      console.log(err)
      res.status(500).json({error: err.message})
    } else if(customers == null) {
      res.send(404).json({info: 'No customers found'})
    } else {
      res.status(200).json(customers)
    }
  })
}

exports.getCustomer = (req, res) => {

  let id = req.params.id

  Customer.findOne({ _id: id }, (err, customer) => {
    if (err) {
      console.log(err)
      if(err.name === 'CastError') {
        res.status(400).json({error: 'ID ' + id + ' has wrong format'})
      } else {
        res.status(500).json({error: err.message})
      }
      
    } else if (customer == null) {
      res.status(404).json({error: 'Customer with ID ' + id + ' not found.'})
    } else {
      res.status(200).json(customer)
    }
  })
}

exports.addCustomer = (req, res) => {
  let newCustomer = new Customer(req.body)

  newCustomer.save((err, customer) => {
    if (err) {
      console.log('Error while saving customer: ' + JSON.stringify(newCustomer))
      console.log(err)
      res.status(400).json({error: err.message})
    } else {
      console.log('Saved customer: ' + JSON.stringify(customer))
      res.status(201).redirect(301, '/api/customer/' + newCustomer._id)
    }
  })
}

exports.updateCustomer = (req, res) => {
  let id = req.params.id
  // TODO
  res.send('Not yet implemented')
}

exports.deleteCustomer = (req, res) => {
  let id = req.params.id

  Customer.findOneAndDelete({ _id: id }, (err, customer) => {
    if (err) {
      console.log('Error while deleting customer with ID ' + id)
      console.log(err)
      if(err.name === 'CastError') {
        res.status(400).json({error: 'ID ' + id + ' has wrong format'})
      } else {
        res.status(500).json({error: err.message})
      }
    } else if(customer == null) {
      res.status(404).json({error: 'Customer with ID ' + id + ' not found.'}) 
    } else {
      console.log('Deleted customer with ID ' + id)
      res.status(204).send()
    }
  })
}

