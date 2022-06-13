const express = require("express");

const authRouter = require("./auth/auth.router");
const userRouter = require("./user/user.router");
const authMiddleware = require("../middlewares/authentication.middlware");

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/users", authMiddleware, userRouter);

module.exports = apiRouter;
