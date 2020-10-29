'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const app = express();
const router = express.Router();
// Conecta o banco'
mongoose.connect(config.connectionstring);
// Carregar Models
const Product = require('./models/product');
const Customer = require('./models/customer'); 
const Order = require('./models/order'); 

//  Carrega as Rotas
const indexRoute = require('./routes/index-routes');
const productRoute = require('./routes/products-routes');
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);




module.exports = app;
