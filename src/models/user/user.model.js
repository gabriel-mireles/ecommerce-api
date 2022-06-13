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

module.exports = { createUser, findUser, findUsers, documentsCount };
