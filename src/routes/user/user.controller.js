const { StatusCodes } = require("http-status-codes");
const UserModel = require("../../models/user/user.model");
const { API_RESPONSES, SYMBOLS_KEYS } = require("../../utils");

async function httpGetAllUsers(req, res) {
  const users = await UserModel.findUsers({ role: "user" });
  res
    .status(StatusCodes.OK)
    .json({ data: users, status: API_RESPONSES.SUCCESS });
}

async function httpGetSingleUser(req, res) {
  const { id } = req.params;
  const user = await UserModel.findUser({ _id: id }, { password: 0 });
  res
    .status(StatusCodes.OK)
    .json({ data: user, status: API_RESPONSES.SUCCESS });
}

async function httpGetCurrentUser(req, res) {
  const { userId } = req[Symbol.for(SYMBOLS_KEYS.USER)];
  const currentUser = await UserModel.findUser({ _id: userId }, { password: 0 });
  res
    .status(StatusCodes.OK)
    .json({ data: currentUser, status: API_RESPONSES.SUCCESS });
}

async function httpUpdateUser(req, res) {
  return res.send("update user");
}

async function httpUpdateUserPassword(req, res) {
  return res.send("update password");
}

module.exports = {
  httpGetAllUsers,
  httpGetSingleUser,
  httpGetCurrentUser,
  httpUpdateUser,
  httpUpdateUserPassword,
};
