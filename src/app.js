require("./utils/symbols/global.symbol");

const path = require("path");
const morgan = require("morgan");
const fs = require("fs").promises;
const express = require("express");
const cookieParser = require("cookie-parser");

const apiV1 = require("./routes/api.v1");
const expressFileUpload = require("express-fileupload");
const notFoundMiddleware = require("./middlewares/errors/not-found.middleware");
const errorHandlerMiddleware = require("./middlewares/errors/error-handler.middleware");

const app = express();

app.use(morgan("tiny"));
app.use(expressFileUpload());
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(express.static(path.join(__dirname, "public", "uploads")));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "public"));
app.get("/", async (req, res) => {
  const images = await fs.readdir(path.join(__dirname, "public", "uploads"));

  console.log(images);
  res.render("index", { images });
});

app.get("/api/v1", (req, res) => {
  res.send("e-commerce api");
});

app.use("/api/v1", apiV1);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
