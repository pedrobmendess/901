'use istrict';
// const mongoose = require('mongoose');
// const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');
const md5 = require('md5');
const emailService = require('../services/email-services');


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

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O título deve conter mais de três caracteres');
    contract.isEmail(req.body.email, 'e-mail Inválido');
    contract.hasMinLen(req.body.password, 3, 'O password deve conter mais de quatro caracteres');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try{
        await repository
        .create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
            })
            res.status(201).send({
            message: 'Cliente cadastrado com sucesso!'
            });
        }  catch (e) {
            res.status(500).send({
                message: 'Deu tudo errado....'
            })};};
