const express = require('express');
const comment = express.Router();
const commentController = require('../controllers/comment');

comment.get('/comment/:commentId', commentController.getComment);
comment.get('/comments', commentController.getComments);
comment.post('/comments', commentController.createComment);
comment.patch('/comments/:commentId', commentController.updateComment);
comment.delete('/comments/:commentId', commentController.deleteComment);

module.exports = comment;
