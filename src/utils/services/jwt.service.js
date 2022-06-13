const jwt = require("jsonwebtoken");

function _createToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
}

function isValidToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

function createTokenAndAttachCookies(res, payload) {
  const token = _createToken(payload);
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true
  });
}

function createUserTokenPayload(user) {
  return {
    userId: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

module.exports = {
  isValidToken,
  createTokenAndAttachCookies,
  createUserTokenPayload
};
