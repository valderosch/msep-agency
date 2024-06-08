const User = require("../models/User");
const UUid = require("uuid");
const config = require("config");
const fs = require("fs");


class userController {
  async makeNewSubscription (request, response) {
    try{

    } catch (e) {
      console.log(e);
      return response.status(500).json({
        message: "SERVER | Error while [creating] subscription"
      });
    }
  }

  async deleteSubscription(request, response){
    try{

    } catch (e) {
      console.log(e);
      return response.status(500).json({
        message: "SERVER | Error while [deleting] subscription"
      });
    }
  }

  async calculateAdsCosts(request, response){
    try{

    } catch (e) {
      console.log(e);
      return response.status(500).json({
        message: "SERVER | Error while [calculating] subscription price"
      });
    }
  }
}

module.exports = new userController();