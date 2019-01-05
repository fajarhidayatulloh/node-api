let mysql = require("mysql"), logger = require('winston');
let connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE
});
connection.connect((err) => {
    if (err) throw err
    logger.info('You are now connected to database ...')
});
module.exports=connection;
