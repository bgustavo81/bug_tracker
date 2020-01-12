const express = require('express');
const user = express.Router();
const userController = require('../controllers/user');

user.get('/user/:id', userController.getUser);
user.get('/users', userController.getUsers);
user.post('/users', userController.createUser);
user.patch('/users/:id', userController.udpateUser);
user.delete('/users/:id', userController.deleteUser);

module.express = user;