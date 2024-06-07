require('dotenv').config();
const pool = require('../database/database_connection');
const a = 2
const b = 3

console.log(a / b);
const dbHost = process.env.DB_PASSWORD;
//console.log(pool);