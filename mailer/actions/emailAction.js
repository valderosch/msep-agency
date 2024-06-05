const cron = require('node-cron');
const Subscription = require('../models/subscription');
const emailController = require('../controllers/emailController');

cron.schedule('0 0 * * *', async () => {
    const today = new Date();
    console.log('Running cron job at', today);

    try {
        const subscriptions = await Subscription.find({
            startDate: { $lte: today },
            endDate: { $gte: today },
        });

        console.log(`Found ${subscriptions.length} subscriptions`);

        subscriptions.forEach(subscription => {
            const daysSinceStart = Math.floor((today - subscription.startDate) / (1000 * 60 * 60 * 24));
            console.log(`Processing subscription ${subscription._id}, days since start: ${daysSinceStart}`);

            if (daysSinceStart % subscription.interval === 0) {
                console.log(`Sending email for subscription ${subscription._id}`);
                emailController.sendEmail(subscription);
            }
        });
    } catch (err) {
        console.error('Error fetching subscriptions: ', err);
    }
});
