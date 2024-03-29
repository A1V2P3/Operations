
const mysql=require('mysql2/promise');

const mysqlPool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Password@123',
    database:'read'
})

module.exports= mysqlPool