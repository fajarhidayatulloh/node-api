const express = require('express');
let krouter = express.Router(), 
logger = require('winston'),
bcrypt = require('bcrypt'), 
db= require('./../db');

krouter.get('/', (req,res) =>{
    let sql = 'SELECT name,email,created_at FROM users';
    db.query(sql, (err,result)=>{
        if (err) throw err
        res.send({"status":200, "error":null, "data":result});
        
    });
    logger.info(sql);
});

krouter.get('/profile/:id',(req, res) => {
    let sql = 'SELECT * FROM users WHERE id= ?';
    let id = req.params.id;
    db.query(sql, id, (err,result) => {
        if(err) throw err
        res.send({"status":200, "error":null, "data":result});  
    });

    logger.info(sql);
    logger.info(id);
});

krouter.post('/registration', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        let records = {
            name : req.body.name,
            email : req.body.email,
            password : hash,
            created_at : new Date()
        };
        let sql = 'INSERT INTO users SET ? ';
        db.query(sql, records, (err, result) => {
            if (err) throw err
            res.send({"status":200, "error":null, "message":"Registration Successfully"});
        });
        logger.info(sql);
        logger.info(req.body);
    });
    
});

module.exports = krouter;