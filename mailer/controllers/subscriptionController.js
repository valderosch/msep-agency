const Subscription = require('../models/subscription');

const createSubscription = (req, res) => {
    const { username, from, to, subject, text, interval, startDate, endDate } = req.body;

    const newSubscription = new Subscription({
        username,
        from,
        to,
        subject,
        text,
        interval,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
    });

    newSubscription.save((err, subscription) => {
        if (err) {
            return res.status(500).send(err.toString());
        }
        res.status(200).send('Subscription created: ' + subscription._id);
    });
};

module.exports = { createSubscription };
