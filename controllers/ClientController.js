const express = require('express');
let krouter = express.Router(), 
logger = require('winston'),
bcrypt = require('bcryptjs'), 
jwt = require('jsonwebtoken');
db = require('./../db');
checkAuth = require('./../checkAuth');

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

krouter.get('/',verifyToken, (req,res) =>{
    jwt.verify(req.token, config.secret, (err) => {
        if(err) {
            res.status(401).send({
                "status":401, 
                "error":null, 
                "message":"Unauthorize"
            });
        } else {
            let sql = 'SELECT name,email,created_at FROM users';
            db.query(sql, (err,result)=>{
                if (err) throw err
                res.send({"status":200, "error":null, "data":result});
                
            });
            logger.info(sql);
        }
    });
});

krouter.get('/profile/:id',verifyToken,(req, res) => {
    jwt.verify(req.token, config.secret, (err) => {
        if(err) {
            res.status(401).send({
                "status":401, 
                "error":null, 
                "message":"Unauthorize"
            });
        } else {
            let sql = 'SELECT * FROM users WHERE id= ?';
            let id = req.params.id;
            db.query(sql, id, (err,result) => {
                if(err) throw err
                res.send({"status":200, "error":null, "data":result});  
            });

            logger.info(sql);
            logger.info(id);
        }
    });
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