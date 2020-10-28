'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();
// Conecta o banco
mongoose.connect('mongodb+srv://pedro:loki1005@cluster0.vy7wf.mongodb.net/nodestr');
// Carrega os Models
const Product = require('./models/product');
const Customer = require('./models/customer'); 
const Order = require('./models/order'); 

//  Carrega as Rotas
const indexRoute = require('./routes/index-routes');
const productRoute = require('./routes/products-routes');
const customerRoute = require('./routes/customer-route')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);



module.exports = app;
