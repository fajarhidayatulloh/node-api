const express = require('express');
let auth = express.Router(), 
logger = require('winston'),
bcrypt = require('bcryptjs'), 
jwt = require('jsonwebtoken');
db= require('./../db');
config  = require('./../config');

var users = [{
  id: 1,
  username: 'admin',
  password: 'admin'
}];

function createIdToken(user) {
  	return jwt.sign(_.omit(user, 'password'), config.secret, { expiresIn: 60*60*5 });
}

function createAccessToken() {
	return jwt.sign({
		iss: config.issuer,
		aud: config.audience,
		exp: Math.floor(Date.now() / 1000) + (60 * 60),
		scope: 'full_access',
		sub: "lalaland|fajar",
		jti: genJti(), // unique identifier for the token
		alg: 'HS256'
	}, config.secret);
}

// Generate Unique Identifier for the access token
function genJti() {
	let jti = '';
	let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 16; i++) {
		jti += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return jti;
}

function getUserScheme(req) {
  
	var username;
	var type;
	var userSearch = {};

	// The POST contains a username and not an email
	if(req.body.username) {
		username = req.body.username;
		type = 'username';
		userSearch = { username: username };
	}
	// The POST contains an email and not an username
	else if(req.body.email) {
		username = req.body.email;
		type = 'email';
		userSearch = { email: username };
	}

	return {
		username: username,
		type: type,
		userSearch: userSearch
	}
}

auth.post('/user', function(req, res) {
  
	var userScheme = getUserScheme(req);  

	if (!userScheme.username || !req.body.password) {
		return res.status(400).send("You must send the username and the password");
	}

	if (_.find(users, userScheme.userSearch)) {
		return res.status(400).send("A user with that username already exists");
	}

	var profile = _.pick(req.body, userScheme.type, 'password', 'extra');
	profile.id = _.max(users, 'id').id + 1;

	users.push(profile);

	res.status(201).send({
		id_token: createIdToken(profile),
		access_token: createAccessToken()
	});
});

auth.post('/login', function(req, res) {
	var user;
	let sql = 'SELECT * FROM users WHERE email= ?';
    let email = req.body.email;
	db.query(sql, email, (err,user) => {
        if(err) throw err
        const user{
        	user
        } 
	    
    });

});

// Verify Token
function verifyToken(req, res, next) {
	// Get auth header value
	const bearerHeader = req.headers['authorization'];
	// Check if bearer is undefined
	if(typeof bearerHeader !== 'undefined') {
		// Split at the space
		const bearer = bearerHeader.split(' ');
		// Get token from array
		const bearerToken = bearer[1];
		// Set the token
		req.token = bearerToken;
		// Next middleware
		next();
	} else {
		// Forbidden
		res.sendStatus(403);
	}
}

auth.get('/users', verifyToken,(req,res) =>{
	jwt.verify(req.token, 'secretkey', (err) => {
	    if(err) {
	      	res.send({"status":401, "error":null, "message":"Tidak Login"},401);
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

module.exports = auth;