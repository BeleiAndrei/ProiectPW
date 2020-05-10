const express = require('express');

const AnswersService = require('./services.js');

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

router.post('/', authorizeAndExtractToken, authorizeRoles('support'), async(req, res, next) => {
    const {
        username,
        question_id,
        message
    } = req.body;

    console.log(req.body);

    try {
        await AnswersService.post(question_id, username, message);

        res.status(200).end();
    } catch(err) {
        next(err);
    }
});



module.exports = router;