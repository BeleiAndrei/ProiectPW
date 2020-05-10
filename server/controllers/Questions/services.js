const {
    Questions,
    Users
} = require('../../data');

const post = async (product_id, username, message) => {
    const user = await Users.findOne({'username': username});

    if (user == null) {
        throw new ServerError("User not found", 404);
    }

    const question = new Questions({
        user_id: user._id,
        product_id: product_id,
        important: false,
        message: message
    });

    await question.save();
};

const put = async (id) => {
    console.log(id);
    await Questions.findByIdAndUpdate(id, 
        {
            $set: {
                important: true
            }
        })
}

const deleteQuestion = async(id) => {
    console.log(id);
    await Questions.findOneAndDelete({'_id' : id});
}

module.exports = {
    post,
    put,
    deleteQuestion
}