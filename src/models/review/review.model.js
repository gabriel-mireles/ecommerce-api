const { CustomAPIErrors, checkUserPermissions } = require("../../utils");
const ReviewModelDB = require("./review.mongo");

async function createReview(review) {
  return await ReviewModelDB.create(review);
}

async function doesReviewAlreadyExist(userId, productId) {
  const review = await ReviewModelDB.findOne({
    user: userId,
    product: productId,
  });

  return review ? true : false;
}

async function getReviews() {
  return await ReviewModelDB.find()
    .populate({ path: "product", select: "name company price" })
    .populate({ path: "user", select: 'name' })
    .select("-__v");
}

async function getReviewById(_id) {
  return await ReviewModelDB.findById(_id);
}

async function deleteReview(user, reviewId) {
  const review = await getReviewById(reviewId);

  if (!review) {
    throw new CustomAPIErrors.NotFoundError(
      `No review found with the id ${reviewId}`
    );
  }

  checkUserPermissions(user.userId, review.user);
  await review.remove();
}

async function updateReview(user, reviewId, newReview) {
  const review = await getReviewById(reviewId);

  if (!review) {
    throw new CustomAPIErrors.NotFoundError(
      `No review found with the id ${reviewId}`
    );
  }

  checkUserPermissions(user.userId, review.user);
  review.rating = newReview.rating;
  review.comment = newReview.comment;
  review.title = newReview.title;

  return await review.save();
}

module.exports = {
  createReview,
  doesReviewAlreadyExist,
  getReviews,
  getReviewById,
  deleteReview,
  updateReview,
};
