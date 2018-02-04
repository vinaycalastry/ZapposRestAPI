var mysql      = require('mysql');

var connection = mysql.createPool({
        connectionLimit :process.env.CONNLIMIT,
        host     : process.env.HOST,
        port	 : process.env.MYSQLPORT,
        user     : process.env.USER,
        password : process.env.PASSWORD,
        database : process.env.DATABASE
      });


module.exports = connection; 