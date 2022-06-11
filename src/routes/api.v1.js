const express = require("express");

const authRouter = require("./auth/auth.router");
const authMiddleware = require("../middlewares/authentication.middlware");

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/products", authMiddleware, (req, res) => {
  res.status(200).json(req[Symbol.for("user")]);
});

module.exports = apiRouter;
