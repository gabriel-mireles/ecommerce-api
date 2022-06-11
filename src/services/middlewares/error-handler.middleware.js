const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");

const { API_RESPONSES } = require("../../utils");

const DUPLICATE_ERROR_CODE = 11000;

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    error: err.message || "Something went wrong, try again later",
    status: API_RESPONSES.ERROR,
  };

  if (err instanceof mongoose.Error.ValidationError) {
    customError.error = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err instanceof mongoose.Error.CastError) {
    customError.error = `No item found with id: ${err.value}`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.code && err.code === DUPLICATE_ERROR_CODE) {
    customError.error = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  const { status, statusCode, error } = customError;
  return res.status(statusCode).json({ error, status });
};

module.exports = errorHandlerMiddleware;
