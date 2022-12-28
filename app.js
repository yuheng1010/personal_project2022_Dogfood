// connection configurations
require('dotenv').config();

var cors = require('cors')
var express = require('express');
const axios = require('axios')
const pool = require('./db');

var app = express();


var bodyParser = require('body-parser');
const { json } = require("express");
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, defParamCharset: "utf8" }));
app.use('/', express.static('public'));
app.use('/api/v1/',[require('./server/routes/product_route'),require("./server/routes/user_route")]);


app.listen(7000, function () {
    console.log('Node app is running on port 7000');
});

module.exports = app;