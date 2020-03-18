const express = require('express');
const user = express.Router();
const userController = require('../controllers/users');

user.get('/user/:userId', userController.getUser);
user.get('/users', userController.getUsers);
user.post('/user', userController.createUser);
user.patch('/user/:userId', userController.updateUser);
user.delete('/user/:userId', userController.deleteUser);

module.exports = user;