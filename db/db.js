const Sequelize = require('sequelize');
// Option 3: Passing parameters separately (other dialects)
const connection = new Sequelize('nodeapp', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mysql'
        /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});







/*working*/

// const mysql = require('mysql')
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'nodeapp'
// })

// connection.connect()
// connection.connect(function(err) {
//     if (err) throw err;
//     console.log('Database is connected successfully !');
//   });


module.exports = connection;