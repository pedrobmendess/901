'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Product = require('./models/product')

const app = express();
const router = express.Router();

mongoose.connect('mongodb+srv://pedro:loki1005@cluster0.vy7wf.mongodb.net/nodestr');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
// Carrega Rotas
const indexRoute = require('./routes/index');
const productRoute = require('./routes/products');

app.use('/', indexRoute);
app.use('/products', productRoute);


module.exports = app;
