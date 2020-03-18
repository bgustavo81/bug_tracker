const Project = require('../models/project');

exports.getProject = async (req, res, next) => {
    const projId = req.params.projId;
    console.log(req)
    try {
        const result = await Project.getProject(projId);
        let status = res.status(200).json({
            message: `project ${projId} was retrieved`,
            projects: result.rows
        });
        console.log(result);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getProjects = async (req, res, next) => {
    try {
        const result = await Project.getProjects();
        res.status(200).json({
            message: 'Fetched projects sucessfully.',
            projects: result.rows
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}


exports.createProject = async (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    const deadline = req.body.deadline;
    const userId = req.body.userId;
    console.log(userId);
    const project = new Project(null, userId, title, content, deadline);
    try {
        const result = await project.createProject();
        const status = res.status(201).json({
            message: "Created Project",
            project: result.rows
        });
        // console.log(status);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.updateProject = async (req, res, next) => {
    const projId = req.params.projId;
    const author = req.body.author;
    const title = req.body.title;
    const content = req.body.content;
    const deadline = req.body.deadline;
    try {
        const project = await Project.getProject(projId);
        if (!project) {
            const error = new Error('Could not find Project');
            error.statusCode = 404;
            throw error;
        }
        project.author = author;
        project.title = title;
        project.content = content;
        project.deadline = deadline;
        project.projId = projId;
        const result = await Project.updateProject(title, content, deadline, projId);
        res.status(200).json({
            message: 'Updated!',
            project: result.rows
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.deleteProject = async (req, res, next) => {
    const projId = req.params.projId;
    try {
        const result = Project.deleteProject(projId)
            .then(project => {
                if (!project) {
                    const error = new Error("Could not delete project");
                    error.statusCode = 404;
                    throw error;
                }
                res.status(200).json({
                    message: "Deleted !",
                    project: result.rows
                });
            })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}