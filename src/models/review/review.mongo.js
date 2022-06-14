const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: [true, "Provide a rating"],
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Provide a review title"],
      maxlength: 100,
    },
    comment: {
      type: String,
      required: [true, "Provide a review comment"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: [true, "Provide a user"],
      ref: "User",
    },
    product: {
      type: mongoose.Types.ObjectId,
      required: [true, "Provide a product"],
      ref: "Product",
    },
  },
  { timestamps: true }
);

ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

ReviewSchema.statics.calculateReviewsFieldsInProductModel = async function (
  productId
) {
  const result = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        numOfReviews: { $sum: 1 },
      },
    },
  ]);

  try {
    await this.model("Product").findOneAndUpdate(
      { _id: productId },
      {
        averageRating: Math.ceil([result[0]?.averageRating] || 0),
        numOfReviews: result[0]?.numOfReviews || 0,
      }
    );
  } catch(err) {
    console.log(err)
  }
};

ReviewSchema.post("save", async function (doc, next) {
  this.constructor.calculateReviewsFieldsInProductModel(this.product);
});

ReviewSchema.post("remove", async function () {
  this.constructor.calculateReviewsFieldsInProductModel(this.product);
});

module.exports = mongoose.model("Review", ReviewSchema);
