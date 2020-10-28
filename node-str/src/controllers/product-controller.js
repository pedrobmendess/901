'use istrict';
// const mongoose = require('mongoose');
// const Product = mongoose.model('Product');
const Product = require('../models/product');
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/poducts-repository');


exports.get = async(req, res, next) => {
    try{
        var data = await repository.get();
        res.status(201).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Deu tudo errado....'
        })
    }
};

exports.getBySlug = async(req, res, next) => {
    try {
        var data = await repository.getBySlug(req.params.slug)
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Deu tudo errado....'
        })};
};

exports.getById = async(req, res, next) => {
    try{
    const data = await repository
        .getById(req.params.id)
        res.status(201).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Deu tudo errado....'
        })};
};


exports.getByTag = async(req, res, next) => {
    try {
        const data = await repository.getByTag(req.params.tag)
            res.status(200).send(data);
        } catch (e) {
            res.status(500).send({
                message: 'Deu tudo errado....'
            })};
    
};

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter mais de três caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter mais de três caracteres');
    contract.hasMinLen(req.body.description, 10, 'A descrição deve conter mais de dez caracteres');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try{
        await repository
        .create(req.body)
            res.status(201).send({
            message: 'Produto cadastrado com sucesso!'
            });
        }  catch (e) {
            res.status(500).send({
                message: 'Deu tudo errado....'
            })};};


exports.put = async(req, res, next) => {
    try{
        await repository.update(req.params.id, req.body)
            res.status(201).send({
            message: 'Produto atualizado com sucesso!'
            });
        }  catch (e) {
            res.status(500).send({
                message: 'Deu tudo errado....'
            })};};

exports.delete = async(req, res, next) => {
    try{
        await repository.delete(req.body.id)
            res.status(200).send({
            message: 'Produto apagado com sucesso!'
            });
        }  catch (e) {
            res.status(500).send({
                message: 'Deu tudo errado....'
            })};};



