const express = require('express');

const BooksService = require('./services.js');
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

router.post('/', authorizeAndExtractToken, authorizeRoles('admin'), async (req, res, next) => {
    const {
        name,
        authorId,
        genres
    } = req.body;
    try {

        const fieldsToBeValidated = {
            name: {
                value: name,
                type: 'alpha'
            },
            author: {
                value: authorId,
                type: 'ascii'
            }
        }

        validateFields(fieldsToBeValidated);

        for (i = 0; i < genres.length; i++) {
            validateFields({
                genre: {
                    value: genres[i],
                    type: 'alpha'
                }
            });
        }

        await BooksService.add(name, authorId, genres);
        res.status(201).end();
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        // pot sa primesc eroare si ca genul nu e bun, trebuie verificat mesajul erorii
        // HINT err.message
        if (err.message !== '')
            next(new ServerError(err.message));
        else
            next(err);
    }
});

router.get('/', authorizeAndExtractToken, authorizeRoles('admin', 'user'), async (req, res, next) => {
    try {
        const books = await BooksService.getAll();
        res.json(books);
        // do logic
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        next(err);
    }
});

router.get('/:id', authorizeAndExtractToken, authorizeRoles('admin', 'user'), async (req, res, next) => {
    const {
        id
    } = req.params;
    try {

        validateFields({
            id: {
                value: id,
                type: 'ascii'
            }
        });

        const book = await BooksService.getById(id);
        res.json(book);
        // do logic
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        next(err);
    }
});

router.get('/authors/:id', authorizeAndExtractToken, authorizeRoles('admin', 'user'), async (req, res, next) => {
    const {
        id
    } = req.params;
    try {
        validateFields({
            id: {
                value: id,
                type: 'ascii'
            }
        });

        const book = await BooksService.getByAuthorId(id);
        res.json(book);
        // do logic
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        next(err);
    }
});

router.put('/:id', authorizeAndExtractToken, authorizeRoles('admin'), async (req, res, next) => {
    const {
        id
    } = req.params;
    const {
        name,
        authorId,
        genres
    } = req.body;
    try {
        const fieldsToBeValidated = {
            name: {
                value: name,
                type: 'alpha'
            },
            author: {
                value: authorId,
                type: 'ascii'
            }
        }

        validateFields(fieldsToBeValidated);

        for (i = 0; i < genres.length; i++) {
            validateFields({
                genre: {
                    value: genres[i],
                    type: 'alpha'
                }
            });
        }

        await BooksService.updateById(id, name, authorId, genres);
        res.status(201).end();
       // do logic
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 

        // pot sa primesc eroare si ca genul nu e bun, trebuie verificat mesajul erorii
        // HINT err.message 
        next(err);
    }
});

router.delete('/:id', authorizeAndExtractToken, authorizeRoles('admin'), async (req, res, next) => {
    const {
        id
    } = req.params;
    try {
        // do logic
        validateFields({
            id: {
                value: id,
                type: 'ascii'
            }
        });

        await BooksService.deleteById(id);
        res.status(201).end();
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        next(err);
    }
});

module.exports = router;