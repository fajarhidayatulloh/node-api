const express = require('express');
let auth = express.Router(), 
logger = require('winston'),
bcrypt = require('bcryptjs'), 
jwt = require('jsonwebtoken');
db = require('./../db');
config  = require('./../config');
check = require('./../checkAuth');

const  findUserByEmail  = (email, cb) => {
    return db.query('SELECT * FROM users WHERE email= ?', email, (err, row) => {
        cb(err,row)
    });
    //logger.info(sql);
}

auth.post('/login', function(req, res) {
	const  email  =  req.body.email;
    const  password  =  req.body.password;
    findUserByEmail(email, (err,user)=>{
    	
        if (err) 
        	return  res.status(500).send({
        		"status":"false",
        		"status_code":500,
        		"message":"Server error!"
        	});
        
        if (!user) 
        	return  res.status(404).send({"status":"false",
        		"status_code":404,
        		"message":"User not found!"
        	});
        
        const  result  =  bcrypt.compareSync(password, user[0].password);
        
        if(!result) 
        	return  res.status(401).send({
        		"status":"false",
        		"status_code":401,
        		"message":"Password not valid!"
        	});

        const  expiresIn  =  24  *  60  *  60;
        const  accessToken  =  jwt.sign({ id:  user[0].id }, config.secret, {
            expiresIn:  expiresIn
        });
        res.status(200).send({ 
        	"status":"true",
        	"status_code":200,
        	"token_type":"Bearer",
        	"access_token": accessToken, 
        	"expires_in": expiresIn
        });
    });

});

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

auth.get('/users', verifyToken,(req,res) =>{
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
		        res.status(200).send({
		        	"status":true,
		        	"status_code":200,  
		        	"data":result
		        });
		        
		    });
		    logger.info(sql);
		}
	});
});

module.exports = auth;