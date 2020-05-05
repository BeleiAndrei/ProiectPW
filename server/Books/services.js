const {
    Books
} = require('../data');

const add = async (name, authorId, genres) => {
    // create new Book obj
    // save it
    const author = authorId;
    const book = new Books ({
        author,
        name,
        genres
    });
    await book.save();
};

const getAll = async () => {
    // get all books
    // populate 'author' field
    // modify output so author is made of 'author.firstName author.lastName'
    return await Books.find().populate('author',  'firstName lastName -_id');
};

const getById = async (id) => {
    // get book by id
    // populate 'author' field
    // modify output so author is made of 'author.firstName author.lastName'
    return await Books.findById(id).populate('author', 'firstName lastName -_id');
};

const getByAuthorId = async (id) => {
    // get book by author id
    // modify output so author is made of 'author.firstName author.lastName'
    return await Books.find({'author': id}).populate('author', 'firstName lastName -_id');
};

const updateById = async (id, name, authorId, genres) => {
    // update by id

    await Books.findOneAndUpdate(id, {name,
        author: authorId,
        genres
    });
};

const deleteById = async (id) => {
    // delete by id
    await Books.deleteOne({_id: id});
};

module.exports = {
    add,
    getAll,
    getById,
    getByAuthorId,
    updateById,
    deleteById
}