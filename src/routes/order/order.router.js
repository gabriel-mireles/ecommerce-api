const express = require("express");
const authorizationMiddleware = require("../../middlewares/auth/authorization.middlware");

const orderController = require("./order.controller");

const orderRouter = express.Router();
const authMiddlewares = [authorizationMiddleware("admin")];

orderRouter
  .route("/")
  .get(authMiddlewares, orderController.httpGetAllOrders)
  .post(orderController.httpCreateOrder);

orderRouter
  .route("/current-user")
  .get(orderController.httpGetCurrentUserOrders);

orderRouter
  .route("/:id")
  .get(orderController.httpGetSingleOrder)
  .patch(orderController.httpUpdateOrder)
  .delete(orderController.httpDeleteOrder);

module.exports = orderRouter;
