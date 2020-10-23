'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb+srv://pedro:loki1005@cluster0.vy7wf.mongodb.net/nodestr');
    
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

const indexRoute = require('./routes/index-routes');
const productRoute = require('./routes/products-routes');

app.use('/', indexRoute);
app.use('/products', productRoute);


module.exports = app;
