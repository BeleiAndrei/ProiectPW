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

const {
    sendEmail
} = require('../mailer/mailerService');

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
        gdpr: false,
        role
    });
    sendEmail(email, username);

    await user.save();
};

const addElevated = async (username, password, role) => {
    const hashedPassword = await hash(password);
    const user = new Users({
        username,
        password: hashedPassword,
        role,
        confirmed: true,
        gdpr: true
    });
    await user.save();
}

const confirmed = async (username) => {
    await Users.findOneAndUpdate({ "username": username }, {$set: {"confirmed": true} });
}

const gdpr = async(username) => {
    await Users.findOneAndUpdate({ "username": username}, {$set: {"gdpr": true} });
}

const updatePassword = async (username, oldPassword, newPassword) => {
    const user = await Users.findOne({ username });

    if (user === null) {
        throw new ServerError(`Utilizatorul inregistrat cu ${username} nu exista!`, 404);
    }
    
    const hashedNew = await hash(newPassword)
    if (await compare(oldPassword, user.password)) {
        await Users.findOneAndUpdate({ "username": username}, 
            { $set:
                {
                    "password": hashedNew
                }
            }
        )
    } 
    throw new ServerError("Parola nu este buna!", 404);

}

const authenticate = async (username, password) => {

    let user;
    if (username.includes("@")) {
        user = await Users.findOne( {"email": username});
    } else {
        user = await Users.findOne({ username });
    }
    
    if (user === null) {
        throw new ServerError(`Utilizatorul inregistrat cu ${username} nu exista!`, 404);
    }

    if (user.role === 'user' && !user.confirmed){
        throw new ServerError('Please confirm your email address before logging in', 400);
    }
    
    if (await compare(password, user.password)) {
        const token =  await generateToken({
            userId: user._id,
            userRole: user.role
        });
        return {
            token: token,
            role: user.role,
            username: user.username,
            gdpr: user.gdpr
        }

    } else {
        throw new ServerError("Combinatia de username si parola nu este buna!", 404);
    }
};

module.exports = {
    add,
    addElevated,
    authenticate,
    confirmed,
    updatePassword,
    gdpr
}