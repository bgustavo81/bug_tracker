const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
    constructor({ subject, recipient }, content) {
        super();

        this.sgApi = sendgrid(keys.sendgridApiKey);
        this.from_email = new helper.Email('no-reply@bugtrackerly.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipient = recipient;

        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();
    }

    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients() {
        const personalize = new helper.Personalization();
        personalize.addTo(this.recipient);
        this.addPersonalization(personalize);
    }

    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        const response = await this.sgApi.API(request);
        return response;
    }       
}

module.exports = Mailer;