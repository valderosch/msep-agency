const nodemailer = require('nodemailer');
const History = require('../models/history');

const sendEmail = (subscription) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'exexexxexe@gmail.com',
            pass: '12345777',
        },
    });

    const mailOptions = {
        from: subscription.from,
        to: subscription.to,
        subject: subscription.subject,
        text: subscription.text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        const historyEntry = new History({
            subscriptionId: subscription._id,
            sentAt: new Date(),
            response: error ? error.toString() : info.response,
        });

        historyEntry.save((err) => {
            if (err) {
                console.error('Error saving mails history: ', err);
            }
        });

        if (error) {
            console.error('Error sending email: ', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = { sendEmail };
