const jwt = require("jsonwebtoken");
const CustomAPIErrors = require("../utils/errors");
const { SYMBOLS_KEYS } = require("../utils");

function authenticationMiddleware(req, res, next) {
  try {
    const { token } = req.signedCookies;
    if (!token)
      throw new CustomAPIErrors.UnauthenticatedError("User not authenticated");

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req[Symbol.for(SYMBOLS_KEYS.USER)] = payload;
    next();
  } catch (e) {
    throw new CustomAPIErrors.UnauthenticatedError("Invalid Authentication");
  }
}

module.exports = authenticationMiddleware;
