
const nodemailer = require('nodemailer'),
    transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'mail.com',
            pass: 'pass',
        },
    }),
    EmailTemplate = require('email-templates').EmailTemplate,
    path = require('path'),
    Promise = require('bluebird');

function sendEmail (obj) {
    return transporter.sendMail(obj);
}

function loadTemplate (templateName, contexts) {
    let template = new EmailTemplate(path.join(__dirname, 'templates', templateName));
    return Promise.all(contexts.map((context) => {
        return new Promise((resolve, reject) => {
            template.render(context, (err, result) => {
                if (err) reject(err);
                else
                resolve({
                    email: result,
                    context,
                });
            });
        });
    }));
}

module.exports = {loadTemplate,sendEmail};

