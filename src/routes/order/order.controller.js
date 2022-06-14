const { StatusCodes } = require("http-status-codes");
const OrderModel = require("../../models/order/order.model");
const ProductModel = require("../../models/product/product.model");
const { SYMBOLS_KEYS, API_RESPONSES, CustomAPIErrors } = require("../../utils");

//#region private methods

function _validateOrderRequest(cartItems, tax, shippingFee) {
  if (!cartItems || cartItems.length < 1) {
    throw new CustomAPIErrors.BadRequestError("No cart items provided");
  }

  if (!tax || !shippingFee) {
    throw new CustomAPIErrors.BadRequestError(
      "No tax or shipping fee provided"
    );
  }
}

function _buildSingleOrderItem(dbProduct, amount) {
  const { name, price, image, _id } = dbProduct;
  return { name, amount, price, image, product: _id };
}

async function _findAndValidateProduct(item) {
  const dbProduct = await ProductModel.getProductById(item.product);

  if (!dbProduct) {
    throw new CustomAPIErrors.NotFoundError(
      `No product with id: ${item.product}`
    );
  }

  return dbProduct;
}

async function _buildOrderItems(cartItems) {
  let orderItems = [];
  let subtotal = 0;

  for (const item of cartItems) {
    const dbProduct = await _findAndValidateProduct(item);
    const singleOrderItem = _buildSingleOrderItem(dbProduct, item.amount);
    orderItems.push({ ...singleOrderItem });
    subtotal += item.amount * dbProduct.price;
  }
  return { orderItems, subtotal };
}

async function _fakeStripeAPI({ amount, currency }) {
  const client_secret = "mock_secret";
  return { client_secret };
}

//#endregion

async function httpGetAllOrders(req, res) {
  res.send("httpGetOrders");
}

async function httpCreateOrder(req, res) {
  const { items: cartItems, tax, shippingFee } = req.body;
  const user = req[Symbol.for(SYMBOLS_KEYS.USER)];
  _validateOrderRequest(cartItems, tax, shippingFee);

  const { orderItems, subtotal } = await _buildOrderItems(cartItems);

  const total = tax + shippingFee + subtotal;
  const paymentIntent = await _fakeStripeAPI({
    amount: total,
    currency: "usd",
  });

  const order = await OrderModel.createOrder({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    user: user.userId,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ data: order, clientSecret: order.clientSecret });
}

async function httpGetCurrentUserOrders(req, res) {
  res.send("httpGetCurrentUserOrders");
}

async function httpGetSingleOrder(req, res) {
  res.send("httpGetSingleOrder");
}

async function httpUpdateOrder(req, res) {
  res.send("httpUpdateOrder");
}

async function httpDeleteOrder(req, res) {
  res.send("httpDeleteOrder");
}

module.exports = {
  httpGetAllOrders,
  httpCreateOrder,
  httpGetCurrentUserOrders,
  httpGetSingleOrder,
  httpUpdateOrder,
  httpDeleteOrder,
};
