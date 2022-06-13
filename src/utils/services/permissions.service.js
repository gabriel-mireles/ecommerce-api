const CustomAPIErrors = require("../errors");

function checkUserPermissions(requestUser, requestedResourceId) {
    console.log(requestUser.role)
  if (requestUser.role === "admin") return;
  if (requestUser === requestedResourceId.toString()) return;

  throw new CustomAPIErrors.UnauthorizedError('Not authorized to access this route')
}

module.exports = { checkUserPermissions };
