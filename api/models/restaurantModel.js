var mysql      = require('mysql');

var connection = mysql.createPool({
        connectionLimit : 10,
        host     : process.env.HOST,
        port	 : process.env.MYSQLPORT,
        user     : process.env.USER,
        password : process.env.PASSWORD,
        database : process.env.DATABASE
      });

/*connection.connect(function(err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
       
        console.log('connected as id ' + connection.threadId);
      });
*/
module.exports = connection; 