const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    username: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    platform: { type: String, required: true },
    cost: { type: Number, default: 0 },
    from: { type: String, required: true },
    to: { type: String, required: true },
    subject: { type: String, required: true },
    text: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
});

module.exports = mongoose.model('AdsSubscription', subscriptionSchema);

