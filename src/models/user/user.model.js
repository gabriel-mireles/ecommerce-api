const UserModelDB = require("./user.mongo");

async function createUser(user) {
  return await UserModelDB.create(user);
}

async function findUser(filter) {
  return await UserModelDB.findOne(filter);
}

async function documentsCount(filter) {
  return await UserModelDB.countDocuments(filter);
}

module.exports = { createUser, findUser, documentsCount };
