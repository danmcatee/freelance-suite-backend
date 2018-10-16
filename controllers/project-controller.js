const Project = require('../models/project')

exports.getProjects = (req, res) => {
  Project.find(req.query).exec((err, projects) => {
    if (err) {
      console.log(err)
      res.status(500).json({error: err.message})
    } else if(projects == null) {
      res.send(404).json({info: 'No projects found'})
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
      if(err.name === 'CastError') {
        res.status(400).json({error: 'ID ' + id + ' has wrong format'})
      } else {
        res.status(500).json({error: err.message})
      }
    } else if (project == null) {
      res.status(404).json({error: 'Project with ID ' + id + ' not found.'})
    } else {
      res.status(200).json(project)
    }
  })
}

exports.addProject = (req, res) => {
  let newProject = new Project(req.body)

  newProject.save((err, project) => {
    if (err) {
      console.log('Error while saving project: ' + JSON.stringify(newProject))
      console.log(err)
      res.status(400).json({error: err.message})
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

  Project.findOneAndDelete({ _id: id }, (err, project) => {
    if (err) {
      console.log('Error while deleting project with ID ' + id)
      console.log(err)
      if(err.name === 'CastError') {
        res.status(400).json({error: 'ID ' + id + ' has wrong format'})
      } else {
        res.status(500).json({error: err.message})
      }
    } else if(project == null) {
      res.status(404).json({error: 'Project with ID ' + id + ' not found.'}) 
    } else {
      console.log('Deleted project with ID ' + id)
      res.status(204).send()
    }
  })
}

