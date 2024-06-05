const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    username: String,
    from: String,
    to: String,
    subject: String,
    text: String,
    interval: Number,
    startDate: Date,
    endDate: Date,
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
