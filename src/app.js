const morgan = require("morgan");
const express = require("express");

const apiV1 = require("./routes/api.v1");
const notFoundMiddleware = require("./services/middlewares/not-found.middleware");
const errorHandlerMiddleware = require("./services/middlewares/error-handler.middleware");

const app = express();

app.use(morgan("tiny"));
app.use(express.json());

app.use("/api/v1", apiV1);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
