const express = require('express');
const router = express.Router();
const _ = require('lodash');
const logger = require('../lib/logger');
const log = logger();
const bcrypt = require("bcrypt");
const {BCRYPT_WORK_FACTOR} = require("../config.js");
const { createToken } = require('../helpers/tokens');
const {
  ensureAdmin,
  ensureCorrectUserOrAdmin,
  authenticateJWT 
} = require("../middleware/auth");

let users = require('../init_data.json').data;
let curId = _.size(users);

/* GET users listing. */
router.get('/', function(req, res, next) {
  try {
    const userArr = _.toArray(users).map(u => {
      const { id, firstName, lastName, email, state, isAdmin } = u;
      return { id, firstName, lastName, email, state, isAdmin };
    });
  res.json(userArr);
  } catch(err) {
    next(err);
  }
});

/* Create a new user */
/* ADDED: password property and encryption, removing password before returning user object */
router.post('/', async function(req, res, next) {
  try {
    const user = req.body;
    if (!user.state) {
      user.state = 'pending';
    };
    user.password = !user.password ? null : await bcrypt.hash(user.password, BCRYPT_WORK_FACTOR);
    curId++;
    user.id = curId;
    users[user.id] = user;
    const token = createToken(user);
    res.json({token});
  } catch(err) {
    next(err);
  };
});

/* Get a specific user by id */
router.get('/:id', authenticateJWT, ensureCorrectUserOrAdmin, function(req, res, next) {  
  try {
    const { id, firstName, lastName, email, state, isAdmin } = users[req.params.id];
    if (!users[req.params.id]) {
      return next();
    }
    res.json({ id, firstName, lastName, email, state, isAdmin });
  } catch(err) {
    next(err);
  };
});

/* Delete a user by id */
router.delete('/:id', ensureAdmin, function(req, res, next) {
  try {
    const user = users[req.params.id];
    delete users[req.params.id];
    res.status(204);
    log.info('Deleted user', user);
    res.json(user);
  } catch(err) {
      next(err);
  };
});

/* Update a user by id */
router.put('/:id', ensureCorrectUserOrAdmin, function(req, res, next) {
  try {
    const user = req.body;
    if (user.id != req.params.id) {
    return next(new Error('ID paramter does not match body'));
  }
  // Ensure non-admin user cannot edit their status or admin status
    if(!res.locals.user.isAdmin) {
      user.state = users[user.id].state;
      user.isAdmin = users[user.id].isAdmin;
    }
    users[user.id] = user;
    const { id, firstName, lastName, email, state, isAdmin } = user;
    log.info('Updating user', user);
    res.json({ id, firstName, lastName, email, state, isAdmin });
  } catch(err) {
      next(err);
  };
});


module.exports = router;
