require("./utils/symbols/global.symbol");

const morgan = require("morgan");
const express = require("express");
const cookieParser = require("cookie-parser");

const apiV1 = require("./routes/api.v1");
const notFoundMiddleware = require("./middlewares/errors/not-found.middleware");
const errorHandlerMiddleware = require("./middlewares/errors/error-handler.middleware");

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.get("/api/v1", (req, res) => {
  res.send("e-commerce api");
});

app.use("/api/v1", apiV1);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
