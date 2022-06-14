const CustomAPIErrors = require("../errors");

function checkUserPermissions(requestUser, requestedResourceId) {
  if (requestUser.role === "admin") return;
  if (requestUser.userId === requestedResourceId.toString()) return;

  throw new CustomAPIErrors.UnauthorizedError('Not authorized to access this route')
}

module.exports = { checkUserPermissions };
