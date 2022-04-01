const express = require('express');
const router = express.Router();
const auth = require("../middlewares/requireLogin");
const Project = require('../models/project');


// @route    GET api/projects/projId
// @desc     Get a project by id
// @access   Private
router.get('/:projId', auth, async (req, res, next) => {
    const projId = req.params.projId;
    try {
        const result = await Project.getProjectById(projId);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
// @route    GET api/projects
// @desc     Get all projects
// @access   Private
router.get('/', auth, async (req, res, next) => {
    try {
        const result = await Project.getProjects();
        res.status(200).json(result.rows)
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
// @route    POST api/projects
// @desc     Post a project by id
// @access   Private
router.post('/', auth, async (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    const deadline = req.body.deadline;
    const userId = req.body.userId;
    const project = new Project(null, userId, title, content, deadline);
    try {
        await project.createProject();
        res.status(201).end();
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
// @route    PATCH api/projects/:projId
// @desc     Update a project by id
// @access   Private
router.patch('/:projId', auth, async (req, res, next) => {
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
        await Project.updateProject(title, content, deadline, projId);
        const result = await Project.getProjectById(projId);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
// @route    DELETE api/projects/:projId
// @desc     Delete a project by id
// @access   Private
router.delete('/:projId', auth, async (req, res, next) => {
    const projId = req.params.projId;
    try {
        const result = Project.deleteProject(projId)
            .then(project => {
                if (!project) {
                    const error = new Error("Could not delete project");
                    error.statusCode = 404;
                    throw error;
                }
                res.status(200).json(projId);
            })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});

module.exports = router;
