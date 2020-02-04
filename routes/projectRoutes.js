const express = require('express');
const project = express.Router();
const projectController = require('../controllers/project');

project.get('/project/:projId', projectController.getProject);
project.get('/projects', projectController.getProjects);
project.post('/project', projectController.createProject);
project.patch('/project/:projId', projectController.updateProject);
project.delete('/project/:projId', projectController.deleteProject);

module.exports = project;