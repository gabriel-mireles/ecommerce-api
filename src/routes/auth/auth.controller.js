const { StatusCodes } = require("http-status-codes");

async function httpRegister(req, res) {
  res.status(StatusCodes.CREATED).json({ msg: "register route" });
}

async function httpLogin(req, res) {
  res.status(StatusCodes.OK).json({ msg: "login route" });
}

async function httpLogout(req, res) {
  res.status(StatusCodes.OK).json({ msg: "logout route" });
}

module.exports = {
  httpRegister,
  httpLogin,
  httpLogout,
};
