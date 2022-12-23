var mysql = require('mysql2/promise');
require('dotenv').config();

var pool  = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB

});
module.exports=pool;