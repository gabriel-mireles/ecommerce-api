const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");

const DUPLICATE_ERROR_CODE = 11000;

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, try again later",
  };

  if (err instanceof mongoose.Error.ValidationError) {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err instanceof mongoose.Error.CastError) {
    customError.msg = `No item found with id: ${err.value}`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.code && err.code === DUPLICATE_ERROR_CODE) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  return res.status(customError.statusCode).json(customError);
};

module.exports = errorHandlerMiddleware;
