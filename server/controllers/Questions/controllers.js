const express = require('express');

const QuestionsService = require('./services.js');

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

router.post('/', authorizeAndExtractToken, authorizeRoles('user'), async(req, res, next) => {
    const {
        username,
        product_id,
        message
    } = req.body;

    try {
        await QuestionsService.post(product_id, username, message);

        res.status(200).end();
    } catch(err) {
        next(err);
    }
});

router.put('/',authorizeAndExtractToken, authorizeRoles('support'), async(req, res, next) => {
    const id = req.body.data.id;

    try {
        await QuestionsService.put(id);

        res.status(204).end();
    } catch(err) {
        next(err);
    }
});

router.delete('/',authorizeAndExtractToken, authorizeRoles('support'), async(req, res, next) => {
    const id = req.body.id;

    try {
        await QuestionsService.deleteQuestion(id);

        res.status(204).end();
    } catch(err) {
        next(err);
    }
});

module.exports = router;