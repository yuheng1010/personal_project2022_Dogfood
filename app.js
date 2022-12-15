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





// app.get('/', function (req, res) {
//     return res.send('hello server');
// });

// app.get('/allfood',async function(req,res){
//     const conn = await pool.getConnection();
//     const [results] = await conn.query("SELECT * FROM allfoods2")
//     console.log(results)
//     return res.status(200).send(results)
// })

// app.get('/detail',async function (req,res){
//     const id = req.query.id;
//     const [results] = await pool.query("SELECT * FROM allfoods2 WHERE id = ?",id)
//     console.log(results)
//     return res.status(200).send(results[0])
// })

app.listen(7000, function () {
    console.log('Node app is running on port 7000');
});

module.exports = app;