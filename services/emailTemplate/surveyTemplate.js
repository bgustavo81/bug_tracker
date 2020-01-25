const keys = require('../../config/keys');

module.exports = (survey) => {
    return `
        <html>
            <body>
            <div style="text-align: center">
                <h3>You have a new bug assignment!</h3>
                <p>{survey.body}</p>
                <p>Please leave your response.</p>
                <div>
                    <a href="${keys.redirectDomain}">Accept</a>
                </div>
                <div>
                    <a href="${keys.redirectDomain}">Decline</a>
                </div>
            </div>
            </body>
        </html>
    `;
}; 