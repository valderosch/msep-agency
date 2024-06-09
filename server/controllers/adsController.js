const AdsSubscription = require("../models/subscription");
const axios = require('axios');

class AdsController {
  async makeNewSubscription(req, res) {
    try {
      const { platform, cost, from, to, subject, text, startDate, endDate } = req.body;
      const subscription = new AdsSubscription({
        username: req.user.id,
        platform,
        cost,
        from,
        to,
        subject,
        text,
        startDate,
        endDate
      });
      await subscription.save();

      const mailResponse = await axios.post('http://localhost:5002/mail/subscribe', {
        username: req.user.email,
        from,
        to,
        subject,
        text,
        interval: 2,
        startDate,
        endDate
      });

      return res.json({ subscription, mailResponse: mailResponse.data });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "SERVER | Error while [creating] subscription"
      });
    }
  }

  async deleteSubscription(req, res) {
    try {
      const { subscriptionId } = req.body;
      await AdsSubscription.findByIdAndDelete(subscriptionId);
      return res.json({ message: "Subscription deleted" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "SERVER | Error while [deleting] subscription"
      });
    }
  }

  async calculateAdsCosts(req, res) {
    try {
      const response = await axios.post('http://127.0.0.1:5000/calculate', req.body);
      return res.json(response.data);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "SERVER | Error while [calculating] subscription price"
      });
    }
  }
}

module.exports = new AdsController();
