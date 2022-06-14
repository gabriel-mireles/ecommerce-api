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

ReviewSchema.statics.calculateAverageRating = async function (productId) {
  console.log(productId);
};


ReviewSchema.post("save", async function (doc, next) {
  this.constructor.calculateAverageRating(this.product);
});

ReviewSchema.post("remove", async function () {
  this.constructor.calculateAverageRating(this.product);
});

module.exports = mongoose.model("Review", ReviewSchema);
