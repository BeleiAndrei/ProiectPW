const express = require('express');

const UsersService = require('./services.js');
const {
    validateFields
} = require('../utils');
const {
    authorizeAndExtractToken
} = require('../security/Jwt');
const {
    ServerError
} = require('../errors');
const {
    authorizeRoles
} = require('../security/Roles');

const router = express.Router();

router.post('/register', async (req, res, next) => {
    const {
        name,
        username,
        password,
        email
    } = req.body;

    // validare de campuri
    try {
        const fieldsToBeValidated = {
            name: {
                value: name,
                type: 'alpha'
            },
            username: {
                value: username,
                type: 'ascii'
            },
            password: {
                value: password,
                type: 'ascii'
            },
            email: {
                value: email,
                type: 'email'
            }
        };
        validateFields(fieldsToBeValidated);
        await UsersService.add(name, username, password, email);

        res.status(201).end();
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        next(err);
    }
});

router.post('/registerElevated', authorizeAndExtractToken, authorizeRoles('admin'), async (req, res, next) => {
    const {
        username,
        password,
        role
    } = req.body;

    // validare de campuri
    try {
        const fieldsToBeValidated = {
            username: {
                value: username,
                type: 'ascii'
            },
            password: {
                value: password,
                type: 'ascii'
            },
        };
        validateFields(fieldsToBeValidated);
        await UsersService.addElevated(username, password, role);

        res.status(201).end();
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        next(err);
    }
});

router.post('/updatePassword', async(req, res, next) => {
    const {
        username,
        oldPassword,
        newPassword
    } = req.body;

    try {
        const fieldsToBeValidated = {
            password: {
                value: newPassword,
                type: 'ascii'
            }
        };

        validateFields(fieldsToBeValidated);
        await UsersService.updatePassword(username, oldPassword, newPassword);
        
        res.status(204);
    } catch (err) {
        next(err);
    }

});

router.post('/login', async (req, res, next) => {
  const {
      username,
      password
  } = req.body;

  try {
    const fieldsToBeValidated = {
        username: {
            value: username,
            type: 'alpha'
        },
        password: {
            value: password,
            type: 'ascii'
        }
    };

    validateFields(fieldsToBeValidated);

    const token = await UsersService.authenticate(username, password);

    res.status(200).json(token);
} catch (err) {
    // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
    next(err);
}

})
module.exports = router;