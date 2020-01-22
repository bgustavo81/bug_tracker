const Comment = require("../models/comment");

exports.getComment = async (req, res, next) => {
    const commentId = req.params.commentId;
    try {
        const result = await Comment.getComment(commentId);
        let status = res.status(200).json({
            message: `post ${commentId} was retrieved`,
            comment: result.rows 
        });
        console.log(status);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
    }
    next(err);
}

exports.getComments = async (req, res, next) => {
    try {
        const result = await Comment.getComments();
        let status = res.status(200).json({
            message: 'Fetch comments successfully.',
            comment: result.rows
        });
        console.log(status)
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
    }
    next(err);
}

exports.createComment = async (req, res, next) => {
    const userId = req.body.userId;
    const content = req.body.content;
    const bugId = req.body.bugId;
    const comment = new Comment(userId, content, bugId);
    try {
        comment.userId = userId;
        comment.content = content;
        comment.bugId = bugId;
        const result = await comment.createComment();
        res.status(201).json({
            message: "Created post!",
            comment: result.rows
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.updateComment = async (req, res, next) => {
    const commentId = req.params.commentId;
    const content = req.body.content;
    try {
        const comment = await Comment.getComment(commentId);
        if (!comment) {
            const error = new Error('Could not find post');
            error.statusCode = 404;
            throw error;
        }
        comment.commentId = commentId;
        comment.content = content;
        const result = await Comment.updateComment(content, commentId);
        res.status(200).json({
            message: "Updated!",
            comment: result.rows
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.deleteComment = async (req, res, next) => {
    const commentId = req.params.commentId;
    try {
        const result = Comment.deleteComment(commentId)
            .then(comment => {
                if (!comment) {
                    const error = new Error("Could not delete bug");
                    error.statusCode = 404;
                    throw error;
                }
                res.status(200).json({
                    message: "Deleted!",
                    comment: result.rows
                });
            })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
    }
    next(err);
}