const Bug  = require('../models/bug');

exports.getBug = async (req, res, next) => {
    const bugId = req.params.bugId
    console.log(bugId);
    try {
        const result = await Bug.getBug(bugId);
        let status = res.status(200).json({
            message: `message ${bugId} was retrieved`,
            bug: result.rows
        });
        console.log(status);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getBugs = async (req, res, next) => {
    try {
        const result =  await Bug.getBugs();
        res.status(200).json({
            message: 'Fetched posts successfully.',
            bugs: result.rows
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.createBug = async (req, res, next) => {
    const bugTitle = req.body.bugTitle;
    const priority = req.body.priority;
    const status = req.body.status;
    const bugDesc = req.body.bugDesc;
    const image = req.body.image;
    const deadline = req.body.deadline;
    const author = req.body.author;
    const devEmails = req.body.devEmails;
    const bug = new Bug(
        bugTitle,
        priority,
        status,
        bugDesc,
        image,
        deadline,
        author,
        devEmails
    );
    try {
        bug.bugTitle = bugTitle;
        bug.priority = priority;
        bug.status = status;
        bug.bugDesc = bugDesc;
        bug.image = image;
        bug.deadline = deadline;
        bug.author = author;
        bug.devEmails = devEmails;
        const result = await bug.createBug();
        res.status(201).json({
            message: 'Created!',
            bug: result.rows
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.updateBug = async (req, res, next) => {
    const bugId = req.params.bugId;
    const bugTitle = req.body.bugTitle;
    const priority = req.body.priority;
    const status = req.body.status;
    const bugDesc = req.body.bugDesc;
    const image = req.body.image;
    const deadline = req.body.deadline;
    const author = req.body.author;
    const devEmails = req.body.devEmails;
    try {
        const bug = await Bug.getBug(bugId);
        if (!bug) {
            const error = new Error('Could not find bug');
            error.statusCode = 404;
            throw error;
        }
        bug.bugId = bugId;
        bug.bugTitle = bugTitle;
        bug.priority = priority;
        bug.status = status;
        bug.bugDesc = bugDesc;
        bug.image = image;
        bug.deadline = deadline;
        bug.author = author;
        bug.devEmails = devEmails;
        const result = await Bug.updateBug(
            bugTitle,
            priority,
            status,
            bugDesc,
            image,
            deadline,
            author,
            devEmails,
            bugId
        );
        res.status(200).json({
            message: "Updated!",
            bug: result.rows
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.deleteBug = async (req, res, next) => {
    const bugId = req.params.bugId;
    try {
        const result = await Bug.deleteBug(bugId)
        .then(bug => {
            if (!bug) {
                const error = new Error("Could not delete bug");
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({
                message: "Deleted!",
                bug: result.rows
            });
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};