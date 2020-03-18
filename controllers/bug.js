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
    const image = req.body.imageUrl;
    const deadline = req.body.deadline;
    const author = req.body.author;
    const devEmail = req.body.dev_email;
    const projId = req.body.projId;
    console.log(req.body);


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
};

exports.sendNotification = async (req, res, next) => {

}

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