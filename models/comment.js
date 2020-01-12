const pool = require('../services/pool');

module.exports = class Comment {
    constructor(commentId, userId, content, bugId) {
        this.commentId = commentId;
        this.userId = userId;
        this.content = content;
        this.bugId = bugId;
    }

    static getComment(id) {
        return pool.query(
            'SELECT * FROM comments WHERE commentId = $1',
            [id]
        )
    }

    static getComments() {
        return pool.query(
            'SELECT * FROM comments ORDER BY commentId DESC'
        )
    }

    createComment() {
        return pool.query(
            `INSERT INTO comments (userId, content, bugId)
                VALUES ($1, $2, $3,)`,
            [this.userId, this.content, this.bugId]
        )
    }

    static updateComment(content, commentId) {
        return pool.query(
            `UPDATE comments SET content = $1 WHERE commentId = $2`,
            [content, commentId]
        )
    }
    
    static deleteComment(id) {
        return pool.query(
            'DELETE FROM comments WHERE commentId = $1',
            [id]
        )
    }
}