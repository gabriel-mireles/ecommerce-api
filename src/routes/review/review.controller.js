async function httpGetReviews(req, res) {
  res.send("httpGetReviews");
}

async function httpCreateReview(req, res) {
  res.send("httpCreateReview");
}

async function httpGetSingleReview(req, res) {
  res.send("httpGetSingleReview");
}

async function httpUpdateReview(req, res) {
  res.send("httpUpdateReview");
}

async function httpDeleteReview(req, res) {
  res.send("httpDeleteReview");
}

module.exports = {
  httpGetReviews,
  httpCreateReview,
  httpGetSingleReview,
  httpUpdateReview,
  httpDeleteReview,
};
