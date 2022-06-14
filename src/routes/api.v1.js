const express = require("express");

const authRouter = require("./auth/auth.router");
const userRouter = require("./user/user.router");
const orderRouter = require("./order/order.router");
const reviewRouter = require("./review/review.router");
const productRouter = require("./product/product.router");
const authenticationMiddleware = require("../middlewares/auth/authentication.middlware");

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/users", authenticationMiddleware, userRouter);
apiRouter.use("/products", productRouter);
apiRouter.use("/reviews", reviewRouter);
apiRouter.use("/orders", authenticationMiddleware, orderRouter);

module.exports = apiRouter;
