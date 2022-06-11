const { StatusCodes } = require("http-status-codes");

const userModel = require("../../models/user/user.model");
const { API_RESPONSES, jwtUtil } = require("../../utils");
const CustomErrors = require("../../services/errors");

async function httpRegister(req, res) {
  const { name, email, password } = req.body;

  const emailMatch = await userModel.findUser({ email });
  if (emailMatch)
    throw new CustomErrors.BadRequestError("Email already in use");

  const user = await userModel.createUser({ name, email, password });

  const payload = { userId: user._id, name: user.name, role: user.role };
  jwtUtil.createTokenAndAttachCookies(res, payload);

  res.status(StatusCodes.CREATED).json({ status: API_RESPONSES.SUCCESS });
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
