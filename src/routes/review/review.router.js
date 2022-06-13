const express = require("express");

const reviewController = require("./review.controller");
const authenticationMiddleware = require("../../middlewares/auth/authentication.middlware");

const reviewRouter = express.Router();
const authMiddleware = [authenticationMiddleware];

reviewRouter
  .route("/")
  .get(reviewController.httpGetReviews)
  .post(authMiddleware, reviewController.httpCreateReview);

reviewRouter
  .route("/:id")
  .get(reviewController.httpGetSingleReview)
  .patch(authMiddleware, reviewController.httpUpdateReview)
  .delete(authMiddleware, reviewController.httpDeleteReview);

module.exports = reviewRouter;
