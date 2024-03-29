const express = require("express");

const productController = require("./product.controller");
const authorizationMiddleware = require("../../middlewares/auth/authorization.middlware");
const authenticationMiddleware = require("../../middlewares/auth/authentication.middlware");
const productRouter = express.Router();

const authMiddlewares = [
  authenticationMiddleware,
  authorizationMiddleware("admin"),
];

productRouter
  .route("/")
  .get(productController.httpGetAllProducts)
  .post(authMiddlewares, productController.httpCreateProduct);

productRouter
  .route("/upload-image")
  .post(authMiddlewares, productController.httpUploadImage);

productRouter
  .route("/:id")
  .get(productController.httpGetSingleProduct)
  .patch(authMiddlewares, productController.httpUpdateProduct)
  .delete(authMiddlewares, productController.httpDeleteProduct);

productRouter
  .route("/:id/reviews")
  .get(productController.getSingleProductReviews);

module.exports = productRouter;
