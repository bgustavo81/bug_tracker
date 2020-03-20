const express = require('express');
const router = express.Router();
const auth = require("../middlewares/requireLogin");
const Bug  = require('../models/bug');
const User = require('../models/users');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const keys = require('../config/keys');

const transporter = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_key: keys.sendgridApiKey
      }
    })
  );

// @route    GET api/bugs/:bugId
// @desc     get a bug by id
// @access   private
router.get('/:bugId', auth, async (req, res, next) => {
    let bugId = req.params.bugId;
    try {
        const result = await Bug.getBugById(bugId);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});

// @route    GET api/bugs
// @desc     get all bugs
// @access   Private
router.get('/project/:bugId', auth, async (req, res, next) => {
    try {
        const result =  await Bug.getBugsByProject(req.params.bugId);
        res.status(200).json(result.rows)
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});

// @route    GET api/bugs
// @desc     get all bugs for user by email
// @access   Private
router.get('/', auth, async (req, res, next) => {
    try {
        const user = await User.getUserById(req.session.passport.user);
        const dev_email = user.rows[0].email;
        const result =  await Bug.getBugsByEmail(dev_email);
        res.status(200).json(result.rows)
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});


// @route    Post api/bugs
// @desc     Create new bug
// @access   Private
router.post('/', auth, async (req, res, next) => {
    const bugTitle = req.body.bug_title;
    const priority = req.body.priority;
    const status = req.body.status;
    const bugDesc = req.body.bug_desc;
    const image = req.body.imageUrl;
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


    try {
        let userId = author;
        let user = await User.getUser(userId);
        let credits = user.rows[0].credits - 1;
        if (credits <= 0) {
            const error = new Error('You need to buy credits');
            error.statusCode = 404;
            throw error;
        }
        User.removeCreditsFromUser(credits, userId);

        const result = await bug.createBug();
        res.status(201).end();
        transporter.sendMail({
            to: devEmail,
            from: 'no-reply@bug_trackerly.com',
            subject: "New bug assignment",
            html: 
            `
                <div>
                    <h2>${bugTitle}</h2>
                        <div>
                            <img 
                                style="height: 240px;"
                                src="https://foto-bucket-12345.s3.us-east-2.amazonaws.com/${req.body.imageUrl}" 
                            />
                        </div>
                    <div>
                        <p><b>Priority:</b> ${req.body.priority}</p>
                        <p><b>Status:</b> ${req.body.status}</p>
                        <p><b>Description:</b> ${req.body.bug_desc}</p>
                        <p><b>Deadline:</b> ${req.body.deadline}</p>
                        <p>Access here: <a href="${keys.redirectDomain}/project/${req.body.projId}">${keys.redirectDomain}/project/${req.body.projId}</a></p>
                    </div>
                </div>
            `
        }, (err, res) => {
            if (err) { 
                console.log(err) 
            }
            console.log(res);
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});

// @route    PATCH api/bugs/:bugId
// @desc     update a bug
// @access   Private
router.patch('/:bugId', auth, async (req, res, next) => {
    const bugTitle = req.body.bug_title;
    const priority = req.body.priority;
    const status = req.body.status;
    const bugDesc = req.body.bug_desc;
    const image = req.body.image;
    const deadline = req.body.deadline;
    const devEmail = req.body.dev_email;
    const bugId = req.params.bugId;
    try {
        const bug = await Bug.getBugById(bugId);
        if (!bug) {
            const error = new Error('Could not find bug');
            error.statusCode = 404;
            throw error;
        }
        await Bug.updateBug(
            bugTitle,
            priority,
            status,
            bugDesc,
            image,
            deadline,
            devEmail,
            bugId
        );

        const result = await Bug.getBugById(bugId);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});

// @route    DELETE api/bugs
// @desc     Delete bug
// @access   Private
router.delete('/:bugId', auth, async (req, res, next) => {
    const bugId = req.params.bugId;
    try {
        const result = await Bug.deleteBug(bugId)
        .then(bug => {
            if (!bug) {
                const error = new Error("Could not delete bug");
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json(bugId);
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});

module.exports = router;