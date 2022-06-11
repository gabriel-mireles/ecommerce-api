const jwt = require("jsonwebtoken");
const CustomAPIErrors = require("../utils/errors");
const { SYMBOLS_KEYS } = require("../utils");

function authenticationMiddleware(req, res, next) {
  const { token } = req.signedCookies;
  if (!token)
    throw new CustomAPIErrors.UnauthenticatedError("User not authenticated");

  const payload = jwt.verify(token, process.env.JWT_SECRET);
  if (!payload)
    throw new CustomAPIErrors.UnauthenticatedError("Invalid login session");

  req[Symbol.for(SYMBOLS_KEYS.USER)] = payload;
  next();
}

module.exports = authenticationMiddleware;
