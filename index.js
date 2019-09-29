'use strict';

const PATH_OAOA = '/oaoa_api';
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');


const ruser = require('./routes/RouteUser/ruser');
const rcompany = require('./routes/RouteCompany/rcompany');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(PATH_OAOA, ruser);
app.use(PATH_OAOA, rcompany);

app.listen(port, function(){
    console.log('Conexión al puerto '+port);
});