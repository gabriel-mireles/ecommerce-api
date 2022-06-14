async function httpGetAllOrders(req, res) {
  res.send("httpGetOrders");
}

async function httpCreateOrder(req, res) {
  res.send("httpCreateOrder");
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
