const { CustomAPIErrors } = require("../../utils");
const OrderModelDB = require("./order.mongo");

async function createOrder(order) {
  return await OrderModelDB.create(order);
}

async function getAllOrders() {
  return await OrderModelDB.find().select("-__v");
}

async function getOrderById(_id) {
  return await OrderModelDB.findOne({ _id }).select("-__v");
}

async function getOrdersByUserId(_id) {
  return await OrderModelDB.find({ user: _id }).select("-__v");
}

async function updateOrderStatus(orderId, paymentIntentId) {
  const order = await getOrderById(orderId);

  if (!order) {
    throw new CustomAPIErrors.NotFoundError(
      `No order found with id: ${orderId}`
    );
  }

  order.paymentIntentId = paymentIntentId;
  order.status = "paid";

  return await order.save();
}
module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  updateOrderStatus
};
