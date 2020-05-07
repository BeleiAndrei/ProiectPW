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

const add = async (name, username, password, email) => {
    const hashedPassword = await hash(password);
    // TODO remove
    const role = username === 'admin' ? 'admin' : 'user';
    const user = new Users({
        name,
        username,
        password: hashedPassword,
        email,
        confirmed: false,
        role
    });
    await user.save();
};

const addElevated = async (username, password, role) => {
    const hashedPassword = await hash(password);
    const user = new Users({
        username,
        password: hashedPassword,
        role,
        confirmed: true
    });
    await user.save();
}

const confirmed = async (email) => {
    await findOneAndUpdate({ "email": email }, {$set: {"confirmed": true} });
}

const updatePassword = async (username, oldPassword, newPassword) => {
    const user = await Users.findOne({ username });

    if (user === null) {
        throw new ServerError(`Utilizatorul inregistrat cu ${username} nu exista!`, 404);
    }
    
    if (await compare(password, user.password)) {
        await Users.findOneAndUpdate(user.id, {
            password: newPassword
        })
    } 
    throw new ServerError("Parola nu este buna!", 404);

}

const authenticate = async (username, password) => {

    const user = await Users.findOne({ username });
    if (user === null) {
        throw new ServerError(`Utilizatorul inregistrat cu ${username} nu exista!`, 404);
    }
    
    if (await compare(password, user.password)) {
        await generateToken({
            userId: user._id,
            userRole: user.role
        });
    } 
    throw new ServerError("Combinatia de username si parola nu este buna!", 404);
};

module.exports = {
    add,
    addElevated,
    authenticate
}