const CustomAPIErrors = require("../../utils/errors");
const { SYMBOLS_KEYS } = require("../../utils");

function authorizationMiddleware(...roles) {
  return function (req, res, next) {
    const userRole = req[Symbol.for(SYMBOLS_KEYS.USER)].role;
    const isUserAuthorized = roles.includes(userRole);
    if (!isUserAuthorized)
      throw new CustomAPIErrors.UnauthorizedError(
        "Unauthorized to access this route"
      );
    next();
  };
}

module.exports = authorizationMiddleware;
