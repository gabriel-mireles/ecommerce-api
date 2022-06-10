const express = require("express");
const authController = require("./auth.controller");

const authRouter = express.Router();

authRouter.route("/register").post(authController.httpRegister);
authRouter.route("/login").post(authController.httpLogin);
authRouter.route("/logout").get(authController.httpLogout);

module.exports = authRouter;
