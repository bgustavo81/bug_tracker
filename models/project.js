const pool = require('../services/pool');

module.exports = class Project {
    constructor(projId, userId, title, content, deadline) {
        this.projId = projId;
        this.userId = userId;
        this.title = title;
        this.content = content;
        this.deadline = deadline;
        console.log(userId, title, content, deadline)
    }

    static getProjectById(projId) {
        return pool.query(
            `SELECT * FROM projects WHERE project_id = $1`,
            [projId]
        );
    };

    static getProject(projId) {
        return pool.query(
            'SELECT * FROM projects WHERE project_id = $1',
            [projId]
        );
    };

    static getProjects() {
        return pool.query(
            'SELECT * FROM projects ORDER BY project_id DESC'
        )
    }

    createProject() {
        return pool.query(
            'INSERT INTO projects (author, title, content, deadline) VALUES ($1, $2, $3, $4)',
            [this.userId, this.title, this.content, this.deadline]
        )
    }

    static updateProject(title, content, deadline, projId) {
        return pool.query(
            `UPDATE projects SET title = $1, content = $2, deadline = $3 WHERE project_id = $4`,
            [title, content, deadline, projId]
        )
    }

    static deleteProject(projId) {
        return pool.query(
            'DELETE FROM projects WHERE project_id = $1',
            [projId]
        )
    }
}