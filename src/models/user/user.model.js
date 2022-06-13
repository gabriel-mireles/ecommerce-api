const { CustomAPIErrors } = require("../../utils");
const UserModelDB = require("./user.mongo");

async function createUser(user) {
  return await UserModelDB.create(user);
}

async function findUser(filter, projection) {
  projection ||= {};
  projection.__v = 0;
  return await UserModelDB.findOne(filter, projection);
}

async function findUsers(filter) {
  return await UserModelDB.find(filter).select({ password: 0, __v: 0 });
}

async function documentsCount(filter) {
  return await UserModelDB.countDocuments(filter);
}

async function updateUser(_id, user) {
  console.log(user)
  return await UserModelDB.findOneAndUpdate({ _id }, user, {
    new: true,
    runValidators: true,
  }).select("-password -__v");
}

async function updatePassword({ _id, newPassword, oldPassword }) {
  const user = await findUser({ _id });

  if (!user)
    throw new CustomAPIErrors.NotFoundError(
      `User with email ${email} not found`
    );

  const isOldPasswordCorrect = await user.comparePassword(oldPassword);

  if (!isOldPasswordCorrect)
    throw new CustomAPIErrors.UnauthenticatedError("Invalid credentials");

  user.password = newPassword;
  user.name = 'ptersito'
  await user.save();
}

module.exports = {
  createUser,
  findUser,
  findUsers,
  documentsCount,
  updateUser,
  updatePassword,
};
