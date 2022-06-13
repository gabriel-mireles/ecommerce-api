const express = require("express");

const productController = require("./product.controller");
const authorizationMiddleware = require("../../middlewares/auth/authorization.middlware");
const authenticationMiddleware = require("../../middlewares/auth/authentication.middlware");
const productRouter = express.Router();

const authMiddleware = [
  authenticationMiddleware,
  authorizationMiddleware("admin"),
];

productRouter
  .route("/")
  .get(productController.httpGetAllProducts)
  .post(authMiddleware, productController.httpCreateProduct);

productRouter.route("/uploadImage").post(productController.httpUploadImage);

productRouter
  .route("/:id")
  .get(productController.httpGetSingleProduct)
  .patch(authMiddleware, productController.httpUpdateProduct)
  .delete(authMiddleware, productController.httpDeleteProduct);

module.exports = productRouter;
