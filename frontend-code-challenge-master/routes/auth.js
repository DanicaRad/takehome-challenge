"use strict";

const express = require("express");
const router = express.Router();
const _ = require('lodash');
const logger = require('../lib/logger');
const log = logger();
const bcrypt = require("bcrypt");
const { createToken } = require("../helpers/tokens");


const users = require('../init_data.json').data;

router.post("/register", async function(req, res, next) {
  const user = req.body;
});

router.post("/token", async function(req, res, next) {
  try {
    const {email, password} = req.body;
    const user = _.toArray(users).find(u => u.email === email);
    if(!user) throw new Error("User not found");
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Invalid email/password combination");
    }
    const token = createToken(user);
    res.json({token});
  } catch(err) {
    console.log("error in route", err);
    return next(err);
  }
})

module.exports = router;
