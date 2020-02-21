const Bug  = require('../models/bug');
const User = require('../models/user');

exports.getBug = async (req, res, next) => {
    let bugId = req.params.bugId;
    try {
        const result = await Bug.getBug(bugId);
        res.status(200).json({
            message: `message ${bugId} was retrieved`,
            bug: result.rows
        });
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
    const bugTitle = req.body.bug_title;
    const priority = req.body.priority;
    const status = req.body.status;
    const bugDesc = req.body.bug_desc;
    const image = req.body.image;
    const deadline = req.body.deadline;
    const author = req.body.author;
    const devEmail = req.body.dev_email;
    const projId = req.body.projId;


    const bug = new Bug(
        null,
        bugTitle,
        priority,
        status,
        bugDesc,
        image,
        deadline,
        author,
        devEmail,
        projId
    );

    console.log(bug);

    try {
        let userId = author;
        let user = await User.getUser(userId);
        console.log(user.rows[0]);
        let credits = user.rows[0].credits - 1;
        console.log(credits);
        if (credits <= 0) {
            const error = new Error('You need to buy credits');
            error.statusCode = 404;
            throw error;
        }
        User.removeCreditsFromUser(credits, userId);

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
    const bugTitle = req.body.bug_title;
    const priority = req.body.priority;
    const status = req.body.status;
    const bugDesc = req.body.bug_desc;
    const image = req.body.image;
    const deadline = req.body.deadline;
    const devEmail = req.body.dev_email;
    const bugId = req.params.bugId;
    try {
        const bug = await Bug.getBug(bugId);
        if (!bug) {
            const error = new Error('Could not find bug');
            error.statusCode = 404;
            throw error;
        }
        const result = await Bug.updateBug(
            bugTitle,
            priority,
            status,
            bugDesc,
            image,
            deadline,
            devEmail,
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
                message: "Deleted!"
            });
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};