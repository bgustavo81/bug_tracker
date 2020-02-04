const express = require('express');
const bug = express.Router();
const bugController = require('../controllers/bug');

bug.get('/bug/:bugId', bugController.getBug);
bug.get('/bugs', bugController.getBugs);
bug.post('/bug', bugController.createBug);
bug.patch('/bug/:bugId', bugController.updateBug);
bug.delete('/bug/:bugId', bugController.deleteBug);

module.exports = bug;