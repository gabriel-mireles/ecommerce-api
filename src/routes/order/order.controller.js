const { StatusCodes } = require("http-status-codes");
const OrderModel = require("../../models/order/order.model");
const ProductModel = require("../../models/product/product.model");
const {
  SYMBOLS_KEYS,
  API_RESPONSES,
  CustomAPIErrors,
  checkUserPermissions,
} = require("../../utils");

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
  const orders = await OrderModel.getAllOrders();
  res.status(StatusCodes.OK).json({ data: orders, status: API_RESPONSES.OK });
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

  res.status(StatusCodes.CREATED).json({
    data: order,
    clientSecret: order.clientSecret,
    status: API_RESPONSES.OK,
  });
}

async function httpGetCurrentUserOrders(req, res) {
  const user = req[Symbol.for(SYMBOLS_KEYS.USER)];
  const orders = await OrderModel.getOrdersByUserId(user.userId);

  if (!orders) {
    throw new CustomAPIErrors.NotFoundError(
      `No orders found with id: ${orderId}`
    );
  }

  res.status(StatusCodes.OK).json({
    data: orders,
    status: API_RESPONSES.OK,
  });
}

async function httpGetSingleOrder(req, res) {
  const orderId = req.params.id;
  const user = req[Symbol.for(SYMBOLS_KEYS.USER)];
  const order = await OrderModel.getOrderById(orderId);

  if (!order) {
    throw new CustomAPIErrors.NotFoundError(
      `No order found with id: ${orderId}`
    );
  }

  checkUserPermissions(user, order.user);

  res.status(StatusCodes.OK).json({
    data: order,
    status: API_RESPONSES.OK,
  });
}

async function httpUpdateOrder(req, res) {
  const orderId = req.params.id;
  const paymentIntentId = req.body?.paymentIntentId;

  if (!paymentIntentId) {
    throw new CustomAPIErrors.BadRequestError("No payment intent provided")
  }

  const order = await OrderModel.updateOrderStatus(orderId, paymentIntentId);

  res.status(StatusCodes.OK).json({data: order, status: API_RESPONSES.SUCCESS})
}

module.exports = {
  httpGetAllOrders,
  httpCreateOrder,
  httpGetCurrentUserOrders,
  httpGetSingleOrder,
  httpUpdateOrder,

};
