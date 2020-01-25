const pool = require('../services/pool');

module.exports = class Survey {
    constructor(author, title, content, recipient, accept, decline) {
        this.author = author;
        this.title = title;
        this.content = content;
        this.recipient = recipient;
        this.accept = accept;
        this.decline = decline;
    }

    createSurvey() {
        return pool.query(
            'INSERT INTO surveys (author, title, content, recipient, accept)',
            [this.author, this.title, this.content, this.recipient, this.accept, this.decline]
        )
    }
};