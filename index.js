const express = require('express'),
    app = express();

require("mysql");
require("dotenv").config();

let helmet = require("helmet"),
    bodyParser = require("body-parser"),
    multer = require("multer"),
    logger = require("winston"),
    jwt = require("jsonwebtoken"),
    users = require("./controllers/ClientController");

app.locals.title = 'Fajar';
app.locals.email = 'fajarrhid@gmail.com';
app.locals.url = process.env.APP_URL;

/**
 * Use helmet to prevent hacking and cracking
 * and enable cors
 */
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.use(helmet());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/** home page */
app.get('/', (req, res, next) => {
    res.send(JSON.stringify({"status": 200, "error": null, "response": "API Connected"}));
});

app.use("/users",users);

/** app listen */
app.listen(5000, () => logger.info('Fajar api on port 5000'));
