const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    subscriptionId: mongoose.Schema.Types.ObjectId,
    sentAt: Date,
    response: String,
});

module.exports = mongoose.model('History', historySchema);
