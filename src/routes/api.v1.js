const express = require("express");

const authRouter = require("./auth/auth.router");
const userRouter = require("./user/user.router");
const productRouter = require("./product/product.router");
const authenticationMiddleware = require("../middlewares/auth/authentication.middlware");

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/users", authenticationMiddleware, userRouter);
apiRouter.use("/products", productRouter);

module.exports = apiRouter;
