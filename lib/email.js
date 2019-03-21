const nodemailer = require('nodemailer'),
    transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'hereemail@gmail.com',
            pass: 'here.',
        },
    }),
    EmailTemplate = require('email-templates').EmailTemplate,
    path = require('path'),
    Promise = require('bluebird');

// I changed the emails from what's in the tutorial because people kept using
// info@geeklaunch.net and sending me their test emails. :P Lesson learned. :)
//
// So yeah, change the emails below from 'example@example.tld' to YOUR email,
// please.
//
// Thank you!
let users = [
    {
        name: 'rev',
        email: 'hereemail@hotmail.com',
    }
];

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


module.exports = {loadTemplate,
                 sendEmail};

