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

// router.post('/', authorizeAndExtractToken, authorizeRoles('admin'), async (req, res, next) => {
//     const {
//         firstName,
//         lastName
//     } = req.body;

//     // validare de campuri
//     try {

//         const fieldsToBeValidated = {
//             firstName: {
//                 value: firstName,
//                 type: 'alpha'
//             },
//             lastName: {
//                 value: lastName,
//                 type: 'alpha'
//             }
//         };

//         validateFields(fieldsToBeValidated);

//         await AuthorsService.add(firstName, lastName);

//         res.status(201).end();
//     } catch (err) {
//         // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
//         next(err);
//     }
// });

module.exports = router;