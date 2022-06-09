const express = require("express");

const app = express();

app.get('/', (req, res) => {
    res.send('HEY')
})

module.exports = app;
