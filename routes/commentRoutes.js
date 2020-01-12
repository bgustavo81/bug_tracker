const express = require('express');
const comment = express.Router();
const commentController = require('../controllers/comment');

comment.get('/comment/:id', commentController.getComment);
comment.get('/comments', commentController.getComments);
comment.post('/comments', commentController.createComment);
comment.patch('/comments/:id', commentController.updateComment);
comment.delete('/comments/:id', commentController.deleteComment);

module.exports = comment;
