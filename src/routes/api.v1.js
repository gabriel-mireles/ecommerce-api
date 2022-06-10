const express = require("express");

const authRouter = require("./auth/auth.router");

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);

module.exports = apiRouter;
