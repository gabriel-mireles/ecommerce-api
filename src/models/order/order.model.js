const OrderModelDB = require("./order.mongo");

async function createOrder(order) {
  return await OrderModelDB.create(order);
}

module.exports = {
  createOrder,
};
