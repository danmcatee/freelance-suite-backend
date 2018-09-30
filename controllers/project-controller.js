const Project = require('../models/project')

exports.getProjects = (req, res) => {
  Project.find(req.query).exec((err, projects) => {
    if (err) {
      console.log(err)
      res.status(400).send('Error while getting projects')
    } else {
      res.status(200).json(projects)
    }
  })
}

exports.getProject = (req, res) => {

  let id = req.params.id

  Project.findOne({ _id: id }, (err, project) => {
    if (err) {
      console.log(err)
      res.status(400).send('Error while trying to get project with ID ' + id)
    }
    if (project == null) {
      res.status(404).send('Project with ID ' + id + ' not found.')
    } else {
      res.status(200).json(project)
    }
  })
}

exports.getProjectsByCustomer = (req, res) => {
  let customerId = req.params.customerId

  Project.find({ customerId: customerId}, (err, projects) => {
    if (err) {
      console.log(err)
      res.status(500).send('Error while trying to get project for customer with ID ' + customerId)
    }
    if (projects == null) {
      res.status(404).send('No project for customer with ID ' + customerId+ ' found.')
    } else {
      res.status(200).json(projects)
    }
  })
}

exports.addProject = (req, res) => {
  let newProject = new Project(req.body)

  newProject.save((err, project) => {
    if (err) {
      console.log('Error while saving project: ' + JSON.stringify(newProject))
      console.log(err)
      res.status(400).send('Error while saving project')
    } else {
      console.log('Saved project: ' + JSON.stringify(project))
      res.status(201).redirect(301, '/api/project/' + newProject._id)
    }
  })
}

exports.updateProject = (req, res) => {
  let id = req.params.id
  // TODO
  res.send('Not yet implemented')
}

exports.deleteProject = (req, res) => {
  let id = req.params.id

  Project.deleteOne({ _id: id }, (err) => {
    if (err) {
      console.log('Error while deleting project with ID ' + id)
      console.log(err)
      res.status(500).send('Error while deleting project')
    } else {
      console.log('Deleted project with ID ' + id)
      res.status(204).send()
    }
  })
}

