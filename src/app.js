const express = require("express");

const notFoundMiddleware = require("./services/middlewares/not-found.middleware");
const errorHandlerMiddleware = require("./services/middlewares/error-handler.middleware");
const morgan = require("morgan");

const app = express();

app.use(morgan('tiny'))
app.use(express.json());

app.get('/', (req, res) => {
    res.send('HEY')
})

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware)

module.exports = app;
