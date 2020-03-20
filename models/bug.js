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
        devEmail,
        projId
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
        this.projId = projId;
    }

    static getBugById(bugId) {
        return pool.query(
            `SELECT * FROM bugs WHERE bug_id = $1 LIMIT 1`,
            [bugId]
        );
    };

    static getBugsByProject(projId) {
        return pool.query(
            'SELECT * FROM bugs WHERE project_id = $1',
            [projId]
        );
    };

    static getBugsByEmail(dev_email) {
        return pool.query(
            'SELECT * FROM bugs WHERE dev_email = $1 ORDER BY bug_id DESC',
            [dev_email]
        );
    };

    createBug() {
        return pool.query(
            `INSERT INTO bugs (bug_title, priority, status, bug_desc, image, deadline, author, dev_email, project_id)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
            [
                this.bugTitle, 
                this.priority, 
                this.status, 
                this.bugDesc, 
                this.image, 
                this.deadline, 
                this.author, 
                this.devEmail,
                this.projId
            ]
        )
    }

    static updateBug(bugTitle, priority, status, bugDesc, image, deadline, devEmail, bugId) {
        return pool.query(
            `UPDATE bugs SET 
                bug_title = $1,
                priority = $2,
                status = $3,
                bug_desc = $4,
                image = $5,
                deadline = $6,
                dev_email = $7
            WHERE bug_id = $8`,
            [bugTitle, priority, status, bugDesc, image, deadline, devEmail, bugId]
        )
    }

    static deleteBug(bugId) {
        return pool.query(
            'DELETE FROM bugs WHERE bug_id = $1',
            [bugId]
        )
    }
}