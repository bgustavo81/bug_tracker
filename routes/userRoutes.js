const express = require('express');
const user = express.Router();
const userController = require('../controllers/user');

user.get('/user/:id', userController.getUser);
user.get('/users', userController.getUsers);
user.post('/user', userController.createUser);
user.patch('/user/:id', userController.updateUser);
user.delete('/user/:id', userController.deleteUser);

module.exports = user;