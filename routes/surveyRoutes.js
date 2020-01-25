const Survey = require('../models/survey');
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require('../services/emailTemplate/surveyTemplate');

module.exports = app => {
    app.get('/api/survey/confirmation', (req, res, next) => {
        res.send("Thank you for your response");
    })

    app.post("/api/survey", requireLogin, requireCredits, async (req, res, next) => {
        console.log("hello from survey");
        const { author, title, content, recipient, accepted, declined } = req.body;
        // great place to create a survey

        // const survey = the saved survey
        //
        //

        // the survey feeds data into the survey

        // great place to send an email
        // parameters are survey, template
        const mailer = new Mailer(survey, surveyTemplate(survey));
        await mailer.send();

        // save the survey into the database
        // await
        // deduct a credit from the user
        // save user
        // result the new user model

        // status 422
    })
}