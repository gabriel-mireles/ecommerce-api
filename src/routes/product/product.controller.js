async function httpCreateProduct(req, res) {
  res.send("httpCreateProduct");
}

async function httpGetAllProducts(req, res) {
  res.send("httpGetAllProducts");
}

async function httpGetSingleProduct(req, res) {
  res.send("httpGetSingleProduct");
}

async function httpUpdateProduct(req, res) {
  res.send("httpUpdateProduct");
}

async function httpDeleteProduct(req, res) {
  res.send("httpDeleteProduct");
}

async function httpUploadImage(req, res) {
  res.send("httpUploadImage");
}

module.exports = {
  httpCreateProduct,
  httpGetAllProducts,
  httpGetSingleProduct,
  httpUpdateProduct,
  httpDeleteProduct,
  httpUploadImage,
};
