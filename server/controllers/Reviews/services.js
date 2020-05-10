const {
    Reviews,
    Users
} = require('../../data');

const post = async (product_id, username, message) => {
    const user = await Users.findOne({'username': username});

    if (user == null) {
        throw new ServerError("User not found", 404);
    }

    const review = new Reviews({
        user_id: user._id,
        product_id: product_id,
        message: message
    });

    await review.save();
};

const put = async (id, message) => {
    console.log(id);
    await Reviews.findByIdAndUpdate(id, 
        {
            $set: {
                message: message
            }
        })
}

const deleteReview = async(id) => {
    console.log(id);
    await Reviews.findOneAndDelete({'_id' : id});
}

module.exports = {
    post,
    put,
    deleteReview
}