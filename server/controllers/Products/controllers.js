const express = require('express');

const ProductsService = require('./services.js');

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
    const query = req.body;
    try {
        const products = await ProductsService.get(query);
        res.status(200).json(products);
    } catch (err) {
        next(err);
    }
});

router.get('/view', async(req, res, next) => {
    const id = req.query.id;
    try {
        const productView = await ProductsService.getAndPopulate(id);
        

        res.status(200).json(productView);
    } catch (err) {
        next(err);
    }
})

router.post('/', authorizeAndExtractToken, authorizeRoles('admin'), async(req, res, next) => {
    const {
        name,
        description,
        price,
        image,
        provider
    } = req.body;

    try {
        const fieldToBeValidated = {
            ProductName: {
                value: name,
                type: 'ascii'
            },
            Description: {
                value: description,
                type: 'ascii'
            },
            Price: {
                value: price,
                type: 'int'
            },
            Provider: {
                value: provider,
                type: 'ascii'
            }
        }

        validateFields(fieldToBeValidated);
        await ProductsService.post(name, description, price, provider)
        
        res.status(201).end();
    } catch (err) {
        next(err);
    }
});

router.put('/', authorizeAndExtractToken, authorizeRoles('admin'), async(req, res, next) => {
    const {
        id,
        description,
        price
    } = req.body.data;

    try {
        fieldToBeValidated = {
            Description: {
                value: description,
                type: 'ascii'
            },
            Price: {
                value: price,
                type: 'int'
            }
        };

        validateFields(fieldToBeValidated);
        await ProductsService.put(id, description, price);

        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

router.delete('/', authorizeAndExtractToken, authorizeRoles('admin'), async(req, res, next) => {
    id = req.body.id;

    try {
        await ProductsService.deleteProduct(id);

        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

module.exports = router;