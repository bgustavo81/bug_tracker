const express = require('express');
const router = express.Router();
const auth = require("../middlewares/requireLogin");
const Comment = require("../models/comment");

// @route    GET api/comments/:commentId
// @desc     Get a comment by Id
// @access   Private
router.get('/:commentId', auth, async (req, res, next) => {
    const commentId = req.params.commentId;
    try {
        const result = await Comment.getCommentById(commentId);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
// @route    GET api/comments
// @desc     Get comments
// @access   Private
router.get('/bug/:commentId', auth, async (req, res, next) => {
    const commentId = parseInt(req.params.commentId);
    try {
        const result = await Comment.getCommentsByBug(commentId);
        res.status(200).json(result.rows);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
// @route    POST api/comments/:commentId
// @desc     Post a comment 
// @access   Private
router.post('/', auth, async (req, res, next) => {
    const userId = req.body.author;
    const email = req.body.authorEmail;
    const content = req.body.content;
    const bugId = req.body.bugId;
    const comment = new Comment(null, userId, content, bugId, email);
    try {
        await comment.createComment();
        res.status(201).end();
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
// @route    PATCH api/comments/:commentId
// @desc     Update a comment by Id
// @access   Private
router.patch('/:commentId', auth, async (req, res, next) => {
    const commentId = req.params.commentId;
    const content = req.body.content;
    try {
        const comment = await Comment.getCommentById(commentId);
        if (comment.rows.length === 0) {
            const error = new Error('Could not find comment');
            error.statusCode = 404;
            throw error;
        }
        await Comment.updateComment(content, commentId);
        const result = await Comment.getCommentsByBug(req.body.bugId);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
// @route    GET api/comments/:commentId
// @desc     Get a comment by Id
// @access   Private
router.delete('/:commentId', auth, async (req, res, next) => {
    const commentId = req.params.commentId;
    try {
        const result = Comment.deleteComment(commentId)
            .then(comment => {
                if (!comment) {
                    const error = new Error("Could not delete bug");
                    error.statusCode = 404;
                    throw error;
                }
                res.status(200).json(commentId);
            })
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
});

module.exports = router;
