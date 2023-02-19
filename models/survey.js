const pool = require('../services/pool');

module.exports = class Survey {
    constructor(surveyId, author, title, content, recipient, accept, decline) {
        this.surveyId = surveyId;
        this.author = author;
        this.title = title;
        this.content = content;
        this.recipient = recipient;
        this.accept = accept;
        this.decline = decline;
    }

    createSurvey() {
        return pool.query(
            'INSERT INTO bug_surveys (author, title, content, recipient, accept)',
            [this.author, this.title, this.content, this.recipient, this.accept, this.decline]
        )
    }

    static getSurvey(surveyId) {
        return pool.query(
            'SELECT * FROM bug_surveys WHERE survey_id = $1',
            [surveyId]
        )
    }

    static getSurvey() {
        return pool.query(
            'SELECT * FROM bug_surveys'
        )
    }

    static updateSurvey(title, content, recipient, surveyId) {
        return pool.query(
            `UPDATE bug_surveys SET title = $1, content = $2, recipient = $3 WHERE  survey_id = $4`,
            [title, content, recipient, surveyId]
        )
    }

    static deleteSurvey(surveyId) {
        return pool.query(
            'DELETE FROM bug_surveys WHERE survey_id = $1',
            [surveyId]
        )
    }
};