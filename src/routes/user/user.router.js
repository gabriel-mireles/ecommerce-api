const express = require("express");

const userController = require("./user.controller");

const userRouter = express.Router();

userRouter.route("/").get(userController.httpGetAllUsers);
userRouter.route("/me").get(userController.httpGetCurrentUser);
userRouter.route("/:id").get(userController.httpGetSingleUser);
userRouter.route("/update/user").patch(userController.httpUpdateUser);
userRouter.route("/update/password").patch(userController.httpUpdateUser);

module.exports = userRouter;
