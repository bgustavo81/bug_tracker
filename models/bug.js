const pool = require('../services/pool');

module.exports = class Bug {
    constructor(
        bugId,
        bugTitle,
        priority,
        status,
        bugDesc,
        image,
        deadline,
        author,
        devEmails
    )

    static getBug(id) {
        return pool.query(
            'SELECT * FROM bugs WHERE bugId = $1',
            [id]
        )
    };

    static getBugs() {
        return pool.query(
            'SELECT * FROM bugs ORDER BY bugId DESC',
        );
    }

    createBug() {
        return pool.query(
            `INSERT INTO bugs (bugTitle, priority, status, bugDesc, image, deadline, author, devEmails)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [
                this.bugTitle, 
                this.priority, 
                this.status, 
                this.bugDesc, 
                this.image, 
                this.deadline, 
                this.author, 
                this.devEmails
            ]
        )
    }

    static updateBug(bugTitle, priority, status, bugDesc, image, deadline, author, devEmails, bugId) {
        return pool.query(
            `UPDATE bugs SET 
                bugTitle = $1,
                priority = $2,
                status = $3,
                bugDesc = $4,
                image = $5,
                deadline = $6,
                author = $7,
                devEmails = $8
            WHERE bugId = $9`,
            [bugTitle, priority, status, bugDesc, image, deadline, author, devEmails, bugId]
        )
    }

    static deleteBug(bugId) {
        return pool.query(
            'DELETE FROM bugs WHERE bugId = $1',
            [id]
        )
    }
}