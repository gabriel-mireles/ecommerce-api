const { StatusCodes } = require("http-status-codes");
const UserModel = require("../../models/user/user.model");
const {
  API_RESPONSES,
  SYMBOLS_KEYS,
  CustomAPIErrors,
  jwtService,
  checkUserPermissions,
} = require("../../utils");

async function httpGetAllUsers(req, res) {
  const users = await UserModel.findUsers({ role: "user" });
  res
    .status(StatusCodes.OK)
    .json({ data: users, status: API_RESPONSES.SUCCESS });
}

async function httpGetSingleUser(req, res) {
  const { id } = req.params;
  const user = await UserModel.findUser({ _id: id }, { password: 0 });

  if (!user)
    throw new CustomAPIErrors.NotFoundError(`Not found user with id ${id}`);

  checkUserPermissions(req[Symbol.for(SYMBOLS_KEYS.USER)], user._id);
  res
    .status(StatusCodes.OK)
    .json({ data: user, status: API_RESPONSES.SUCCESS });
}

async function httpGetCurrentUser(req, res) {
  const { userId } = req[Symbol.for(SYMBOLS_KEYS.USER)];
  const currentUser = await UserModel.findUser(
    { _id: userId },
    { password: 0 }
  );
  res
    .status(StatusCodes.OK)
    .json({ data: currentUser, status: API_RESPONSES.SUCCESS });
}

async function httpUpdateUser(req, res) {
  const { userId } = req[Symbol.for(SYMBOLS_KEYS.USER)];
  const { email, name } = req.body;
  const user = await UserModel.updateUser(userId, { email, name });

  const payload = jwtService.createUserTokenPayload(user);
  await jwtService.createTokenAndAttachCookies(res, payload);
  res
    .status(StatusCodes.OK)
    .json({ data: user, status: API_RESPONSES.SUCCESS });
}

async function httpUpdateUserPassword(req, res) {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword)
    throw new CustomAPIErrors.BadRequestError(
      "Please provide the old and new password"
    );

  const { userId } = req[Symbol.for(SYMBOLS_KEYS.USER)];

  await UserModel.updatePassword({ _id: userId, oldPassword, newPassword });
  res.status(StatusCodes.OK).json({ status: API_RESPONSES.SUCCESS });
}

module.exports = {
  httpGetAllUsers,
  httpGetSingleUser,
  httpGetCurrentUser,
  httpUpdateUser,
  httpUpdateUserPassword,
};
