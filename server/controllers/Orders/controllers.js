const express = require('express');

const OrdersSerive = require('./services.js');

const {
    validateFields
} = require('../../utils');
const {
    authorizeAndExtractToken
} = require('../../security/Jwt');

const {
    authorizeRoles
} = require('../../security/Roles');

const router = express.Router();


router.get('/', async(req, res, next) => {

});

router.post('/', async(req, res, next) => {
    const {
        username,
        status,
        products
    } = req.body;

    try {
        
        res.status(201).end();
    } catch (err) {
        next(err);
    }

});

router.put('/', async(req, res, next) => {

});

router.delete('/', async(req, res, next) => {

});

module.exports = router;