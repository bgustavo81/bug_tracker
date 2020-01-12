const express = require('express');
const bug = express.Router();
const bugController = require('../controllers/bug');

bug.get('/bug/:id', bugController.getBug);
bug.get('/bugs', bugController.getBugs);
bug.post('/bugs', bugController.createBug);
bug.patch('/bug/:id', bugController.updateBug);
bug.delete('/bug/:id', bugController.deleteBug);

module.exports = bug;