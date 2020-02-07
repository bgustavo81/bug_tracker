const express = require('express');
const comment = express.Router();
const commentController = require('../controllers/comment');

comment.get('/comment/:commentId', commentController.getComment);
comment.get('/comments', commentController.getComments);
comment.post('/comment', commentController.createComment);
comment.patch('/comment/:commentId', commentController.updateComment);
comment.delete('/comment/:commentId', commentController.deleteComment);

module.exports = comment;
