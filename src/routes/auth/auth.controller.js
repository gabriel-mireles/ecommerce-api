const { StatusCodes } = require("http-status-codes");

const userModel = require("../../models/user/user.model");
const { API_RESPONSES, jwtService } = require("../../utils");
const CustomAPIErrors = require("../../utils/errors");

async function httpRegister(req, res) {
  const { name, email, password } = req.body;

  const emailMatch = await userModel.findUser({ email });
  if (emailMatch)
    throw new CustomAPIErrors.BadRequestError("Email already in use");

  const user = await userModel.createUser({ name, email, password });

  const payload = { userId: user._id, name: user.name, role: user.role };
  jwtService.createTokenAndAttachCookies(res, payload);

  res.status(StatusCodes.CREATED).json({ status: API_RESPONSES.SUCCESS });
}

async function httpLogin(req, res) {
  const { email, password } = req.body;
  if (!email || !password)
    throw new CustomAPIErrors.BadRequestError("Please send an email and password");

  const user = await userModel.findUser({ email });
  const isCorrectPassword = await user.comparePassword(password);

  if (!isCorrectPassword)
    throw new CustomAPIErrors.UnauthenticatedError("Invalid Credentials");

  const payload = { userId: user._id, name: user.name, role: user.role };
  jwtService.createTokenAndAttachCookies(res, payload);

  res.status(StatusCodes.OK).json({ status: API_RESPONSES.SUCCESS });
}

async function httpLogout(req, res) {
  res.status(StatusCodes.OK).json({ msg: "logout route" });
}

module.exports = {
  httpRegister,
  httpLogin,
  httpLogout,
};
