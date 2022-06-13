const { StatusCodes } = require("http-status-codes");
const ProductModel = require("../../models/product/product.model");
const ReviewModel = require("../../models/review/review.model");
const {
  SYMBOLS_KEYS,
  API_RESPONSES,
  CustomAPIErrors,
  checkUserPermissions,
} = require("../../utils");

async function httpGetReviews(req, res) {
  const reviews = await ReviewModel.getReviews();
  return res
    .status(StatusCodes.OK)
    .json({ data: reviews, status: API_RESPONSES.SUCCESS });
}

async function httpCreateReview(req, res) {
  const { product: productId } = req.body;

  await ProductModel.getProductById(productId);

  const { userId } = req[Symbol.for(SYMBOLS_KEYS.USER)];

  const doesReviewExist = await ReviewModel.doesReviewAlreadyExist(
    userId,
    productId
  );

  if (doesReviewExist) {
    throw new CustomAPIErrors.BadRequestError(
      "Already submitted review for this product"
    );
  }
  const review = req.body;
  review.user = userId;

  const createdReview = await ReviewModel.createReview(review);
  return res
    .status(StatusCodes.CREATED)
    .json({ data: createdReview, status: API_RESPONSES.SUCCESS });
}

async function httpGetSingleReview(req, res) {
  const { id: reviewId } = req.params;
  const review = await ReviewModel.getReviewById(reviewId);
  if (!review)
    throw new CustomAPIErrors.NotFoundError(
      `No review found with the id ${reviewId}`
    );

  return res
    .status(StatusCodes.OK)
    .json({ data: review, status: API_RESPONSES.SUCCESS });
}

async function httpUpdateReview(req, res) {
  const { id: reviewId } = req.params;
  const review = req.body;
  const user = req[Symbol.for(SYMBOLS_KEYS.USER)];
  const reviewUpdated = await ReviewModel.updateReview(user, reviewId, review);

  res
    .status(StatusCodes.OK)
    .json({ data: reviewUpdated, status: API_RESPONSES.SUCCESS });
}

async function httpDeleteReview(req, res) {
  const { id: reviewId } = req.params;
  const user = req[Symbol.for(SYMBOLS_KEYS.USER)];
  await ReviewModel.deleteReview(user, reviewId);

  res.status(StatusCodes.OK).json({ status: API_RESPONSES.SUCCESS });
}

module.exports = {
  httpGetReviews,
  httpCreateReview,
  httpGetSingleReview,
  httpUpdateReview,
  httpDeleteReview,
};
