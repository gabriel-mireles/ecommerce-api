const { CustomAPIErrors } = require("../../utils");
const ProductModelDB = require("./product.mongo");

async function createProduct(product) {
  return await ProductModelDB.create(product);
}

async function getAllProducts() {
  return await ProductModelDB.find().select("-__v");
}

async function getProductById(_id) {
  const product = await ProductModelDB.findOne({ _id }).select("-__v");
  if (!product) {
    throw new CustomAPIErrors.NotFoundError(
      `No product found with the id ${_id}`
    );
  }

  return product;
}

async function updateProduct(_id, updatedProduct) {
  const product = await ProductModelDB.findOneAndUpdate(
    { _id },
    updatedProduct,
    {
      new: true,
      runValidators: true,
    }
  ).select("-__v");

  if (!product) {
    throw new CustomAPIErrors.NotFoundError(
      `No product found with the id ${_id}`
    );
  }

  return product;
}

async function deleteProduct(_id) {
  const product = await getProductById(_id);
  if (!product) {
    throw new CustomAPIErrors.NotFoundError(
      `No product found with the id ${_id}`
    );
  }

  await ProductModelDB.deleteOne({ _id }).select("-__v");
  return;
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
