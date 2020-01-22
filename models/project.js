const pool = require('../services/pool');

module.exports = class Project {
    constructor(projId, userId, title, content, deadline) {
        this.projId = projId;
        this.userId = userId;
        this.title = title;
        this.content = content;
        this.deadline = deadline;
    }

    static getProject(projId) {
        return pool.query(
            'SELECT * FROM projects where project_id = $1',
            [projId]
        )
    }

    static getProjects() {
        return pool.query(
            'SELECT * FROM projects ORDER BY project_id'
        )
    }

    createProject() {
        return pool.query(
            'INSERT INTO projects (author, title, content, deadline)',
            [this.userId, this.title, this.content, this.deadline]
        )
    }

    static updateProject(title, content, deadline) {
        return pool.query(
            `UPDATE projects SET title = $1, content = $2, deadline = $3`,
            [title, content, deadline]
        )
    }

    static deleteProject(projId) {
        return pool.query(
            'DELETE FROM projects WHERE project_id = $1',
            [projId]
        )
    }
}