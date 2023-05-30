const mysql = require('mysql2');

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'sourabh',
    password:'Sourabh8839',

});

module.exports = pool.promise();