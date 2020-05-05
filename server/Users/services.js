const {
    Users
} = require('../data');

const {
    generateToken,
} = require('../security/Jwt');

const {
    ServerError
} = require('../errors');

const {
    hash,
    compare
} = require('../security/Password');

const add = async (username, password) => {
    const hashedPassword = await hash(password);
    const role = username === 'admin' ? 'admin' : 'user';
    const user = new Users({
        username,
        password: hashedPassword,
        role
    });
    await user.save();
};

const authenticate = async (username, password) => {

    const user = await Users.findOne({ username });
    if (user === null) {
        throw new ServerError(`Utilizatorul inregistrat cu ${username} nu exista!`, 404);
    }
    
    if (await compare(password, user.password)) {
        return await generateToken({
            userId: user._id,
            userRole: user.role
        });
    } 
    throw new ServerError("Combinatia de username si parola nu este buna!", 404);
};

module.exports = {
    add,
    authenticate
}