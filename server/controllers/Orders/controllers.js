const express = require('express');

const AuthorsService = require('./services.js');

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

});

router.put('/', async(req, res, next) => {

});

router.delete('/', async(req, res, next) => {

});

module.exports = router;