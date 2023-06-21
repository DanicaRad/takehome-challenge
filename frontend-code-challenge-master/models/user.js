const bcrypt = require("bcrypt");
const {BCRYPT_WORK_FACTOR} = require("../config.js");
const logger = require('../lib/logger');
const log = logger();
const _ = require('lodash');
// const users = require('../data');
// let curId = _.size(users);

class User {

  static async authenticate(password, encryptedPassword) {
    const isValid = await bcrypt.compare(password, encryptedPassword);
  }

  static async register(data) {
    const user = data;
    if (!user.state) {
      user.state = 'pending';
    };
    user.password = !user.password ? null : await bcrypt.hash(user.password, BCRYPT_WORK_FACTOR);
    return user;
  };

  getAll(users) {
    // const userArr = _.toArray(users).map(u => {
    //   {firstName, lastName, email, state}
    // });
    log.info("users in model", users);
  };
};

module.exports = {User};