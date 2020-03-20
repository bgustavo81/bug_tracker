const pool = require('../services/pool');

module.exports = class Comment {
    constructor(commentId, userId, content, bugId, email) {
        this.commentId = commentId;
        this.userId = userId;
        this.content = content;
        this.bugId = bugId;
        this.email = email;
    }

    static getCommentById(commentId) {
        return pool.query(
            `SELECT * FROM comments WHERE comment_id = $1 LIMIT 1`,
            [commentId]
        )
    }

    static getComment(commentId) {
        return pool.query(
            'SELECT * FROM comments WHERE comment_id = $1',
            [commentId]
        )
    }

    static getCommentsByBug(bugId) {
        return pool.query(
            'SELECT * FROM comments WHERE bug_id = $1',
            [bugId]
        )
    }

    createComment() {
        return pool.query(
            `INSERT INTO comments (author, author_email, content, bug_id)
                VALUES ($1, $2, $3, $4)`,
            [this.userId, this.email, this.content, this.bugId]
        )
    }

    static updateComment(content, commentId) {
        return pool.query(
            `UPDATE comments SET content = $1 WHERE comment_id = $2`,
            [content, commentId]
        )
    }
    
    static deleteComment(commentId) {
        return pool.query(
            'DELETE FROM comments WHERE comment_id = $1',
            [commentId]
        )
    }
}