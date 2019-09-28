'use strict';

const PATH_OAOA = '/oaoa_api';
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');


const ruser = require('./routes/RouteUser/ruser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(PATH_OAOA, ruser);

app.listen(port, function(){
    console.log('Conexión al puerto ${port}');
});