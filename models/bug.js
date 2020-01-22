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
        devEmail
    ) {
        this.bugId = bugId;
        this.bugTitle = bugTitle;
        this.priority = priority;
        this.status = status;
        this.bugDesc = bugDesc;
        this.image = image;
        this.deadline = deadline;
        this.author = author;
        this.devEmail = devEmail;
    }

    static getBug(id) {
        return pool.query(
            'SELECT * FROM bugs WHERE bug_Id = $1',
            [id]
        )
    };

    static getBugs() {
        return pool.query(
            'SELECT * FROM bugs ORDER BY bug_Id DESC',
        );
    }

    createBug() {
        return pool.query(
            `INSERT INTO bugs (bug_title, priority, status, bug_desc, image, deadline, author, dev_email)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [
                this.bugTitle, 
                this.priority, 
                this.status, 
                this.bugDesc, 
                this.image, 
                this.deadline, 
                this.author, 
                this.devEmail
            ]
        )
    }

    static updateBug(bugTitle, priority, status, bugDesc, image, deadline, author, devEmail, bugId) {
        return pool.query(
            `UPDATE bugs SET 
                bug_title = $1,
                priority = $2,
                status = $3,
                bug_desc = $4,
                image = $5,
                deadline = $6,
                author = $7,
                dev_email = $8
            WHERE bug_id = $9`,
            [bugTitle, priority, status, bugDesc, image, deadline, author, devEmail, bugId]
        )
    }

    static deleteBug(bugId) {
        return pool.query(
            'DELETE FROM bugs WHERE bug_id = $1',
            [id]
        )
    }
}