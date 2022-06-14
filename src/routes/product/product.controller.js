const { SYMBOLS_KEYS, API_RESPONSES, CustomAPIErrors } = require("../../utils");
const ProductModel = require("../../models/product/product.model");
const ReviewModel = require("../../models/review/review.model");
const { StatusCodes } = require("http-status-codes");
const path = require("path");
const fs = require("fs").promises;

async function httpCreateProduct(req, res) {
  const productToSave = req.body;
  productToSave.user = req[Symbol.for(SYMBOLS_KEYS.USER)].userId;
  const product = await ProductModel.createProduct(req.body);

  return res
    .status(StatusCodes.CREATED)
    .json({ data: product, status: API_RESPONSES.SUCCESS });
}

async function httpGetAllProducts(req, res) {
  const products = await ProductModel.getAllProducts();

  return res
    .status(StatusCodes.OK)
    .json({ data: products, status: API_RESPONSES.SUCCESS });
}

async function httpGetSingleProduct(req, res) {
  const { id } = req.params;
  const product = await ProductModel.getProductById(id);

  return res
    .status(StatusCodes.OK)
    .json({ data: product, status: API_RESPONSES.SUCCESS });
}

async function httpUpdateProduct(req, res) {
  const { id } = req.params;
  const updatedProduct = await ProductModel.updateProduct(id, req.body);

  res
    .status(StatusCodes.OK)
    .json({ data: updatedProduct, status: API_RESPONSES.SUCCESS });
}

async function httpDeleteProduct(req, res) {
  const { id } = req.params;
  await ProductModel.deleteProduct(id);

  return res.status(StatusCodes.OK).json({ status: API_RESPONSES.SUCCESS });
}

async function httpUploadImage(req, res) {
  const image = req.files?.image;
  if (!image) {
    throw new CustomAPIErrors.BadRequestError("No image provided");
  }

  console.log(image);
  if (!image.mimetype.startsWith("image")) {
    throw new CustomAPIErrors.BadRequestError("Please upload an IMAGE");
  }

  const maxSize = 1024 * 1024;
  if (image.size > maxSize) {
    throw new CustomAPIErrors.BadRequestError(
      "Please upload image smaller than 1MB"
    );
  }

  const imagePath = path.resolve("src", "public", "uploads", image.name);

  await image.mv(imagePath);
  res
    .status(StatusCodes.OK)
    .json({ data: `/uploads/${image.name}`, status: API_RESPONSES.SUCCESS });
}

async function getSingleProductReviews(req, res) {
  const { id: productId } = req.params;
  console.log(productId)
  const reviews = await ReviewModel.findReview({ product: productId });
  res
    .status(StatusCodes.OK)
    .json({ data: reviews, status: API_RESPONSES.SUCCESS });
}

module.exports = {
  httpCreateProduct,
  httpGetAllProducts,
  httpGetSingleProduct,
  httpUpdateProduct,
  httpDeleteProduct,
  httpUploadImage,
  getSingleProductReviews,
};
