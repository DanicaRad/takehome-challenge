"use strict";

const jwt = require("jsonwebtoken");
const {SECRET_KEY} = require("../config");

/** Middleware: 
 * 
 * Authenticate user
 * if token provided, verify and store token payload on res.locals, including isAdmin field for future authentication. Does not error if no token or invalid token provided */

function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers && req.headers.authorization;
    if(authHeader) {
      const token = authHeader.replace(/^[Bb]earer /, "").trim();
      res.locals.user = jwt.verify(token, SECRET_KEY);
    };
    return next();
  } catch(err) {
    console.log("err", err);
    return next(err);
  };
};

/** Middleware to use to verify logged in user is admin user.
 *
 *  If not, raises error.
 */

function ensureAdmin(req, res, next) {
  try {
    if (!res.locals.user || !res.locals.user.isAdmin) {
      throw new Error("Unauthorized");
    };
    return next();
  } catch (err) {
    return next(err);
  };
};

/** Middleware to use when they must provide a valid token & be user matching
 *  user ID provided as route param or be an admin
 *
 *  If not, raises erorr.
 */

function ensureCorrectUserOrAdmin(req, res, next) {
  try {
    const user = res.locals.user;
    console.log("res.locals.user", user);
    if (!(user && (user.isAdmin || user.username === req.params.username))) {
      throw new Error("Unauthorized");
    }
    return next();
  } catch (err) {
    return next(err);
  };
};

module.exports = {
  authenticateJWT,
  ensureAdmin,
  ensureCorrectUserOrAdmin
};