const express = require('express');
let krouter = express.Router(), logger = require('winston'), db= require('./../db');

krouter.get('/', (req, res) =>{
    let sqlx = 'SELECT * FROM users';
    db.query(sqlx, (error,result)=>{
        if (error) throw error
        res.send({"status":200, "error":null, "data":result});
        logger.info(sqlx);
    });
});

module.exports = krouter;