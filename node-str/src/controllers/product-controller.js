'use istrict'

// const mongoose = require('mongoose');
// const Product = mongoose.model('Product');
const Product = require('../models/product');
const ValidationContract = require('../validators/fluent-validator');


exports.get = (req, res, next) => {
    Product
        .find({ active: true}, 'title slug price')
        .then( data => {
            res.status(201).send(
                data
            );
        }).catch(e => {
            res.status(400).send(e);
        });
    
};

exports.getBySlug = (req, res, next) => {
    Product
        .findOne({ 
            slug: req.params.slug,
            active: true}, 
            'title slug price description tags')
        .then( data => {
            res.status(201).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
    
};

exports.getById = (req, res, next) => {
    Product
        .findById(req.params.id)
        .then( data => {
            res.status(201).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
    
};

exports.getByTag = (req, res, next) => {
    Product
        .find({
            tags: req.params.tag,
            active: true
        }, 'title description price slug tags')
        .then( data => {
            res.status(201).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
    
};

exports.post = (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter mais de três caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter mais de três caracteres');
    contract.hasMinLen(req.body.description, 10, 'A descrição deve conter mais de dez caracteres');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    var product = new Product(req.body);
    product
        .save()
        .then(x => {
            res.status(201).send({
                message: 'Produto cadastrado com sucesso!'
            });
        }).catch(e => {
            res.status(400).send({
                message: "Deu tudo errado...",
                data: e
            });
        });
    
};

exports.put = (req, res, next) => {
    Product
        .findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price
            }
        }).then(x => {
            res.status(201).send({
                message: 'Produto atualizado com sucesso!'
            });
        }).catch(e => {
            res.status(400).send({
                message: "Deu tudo errado...",
                data: e
            });
        });
};

exports.delete = (req, res, next) => {
    Product
        .findOneAndRemove(req.params.id)
        .then(x => {
            res.status(201).send({
                message: 'Produto apagado com sucesso!'
            });
        }).catch(e => {
            res.status(400).send({
                message: "Deu tudo errado...",
                data: e
            });
        });
};



