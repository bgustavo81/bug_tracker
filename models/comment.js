const pool = require('../services/pool');

module.exports = class Comment {
    constructor(commentId, userId, content, bugId) {
        this.commentId = commentId;
        this.userId = userId;
        this.content = content;
        this.bugId = bugId;
    }

    static getComment(commentId) {
        return pool.query(
            'SELECT * FROM comments WHERE comment_id = $1',
            [commentId]
        )
    }

    static getComments() {
        return pool.query(
            'SELECT * FROM comments ORDER BY comment_id DESC'
        )
    }

    createComment() {
        return pool.query(
            `INSERT INTO comments (author, content, bug_id)
                VALUES ($1, $2, $3)`,
            [this.userId, this.content, this.bugId]
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