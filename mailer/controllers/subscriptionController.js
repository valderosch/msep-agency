const Subscription = require('../models/subscription');

const createSubscription = async (req, res) => {
    const { username, from, to, subject, text, interval, startDate, endDate } = req.body;

    try {
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

        const savedSubscription = await newSubscription.save();
        res.status(200).send('Subscription created: ' + savedSubscription._id);
    } catch (err) {
        res.status(500).send(err.toString());
    }
};

module.exports = { createSubscription };

