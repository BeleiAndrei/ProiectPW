const {
    Orders,
    Users
} = require('../../data');

const get = async () => {
    
};

const post = async (username) => {
    const user = await Users.findOne({'username': username});

    if (user == null) {
        throw new ServerError("User not found", 404);
    }

    const order = new Orders({
        user_id: user._id,
        status: "cart",
        totalPrice: 0
    });

};

const put = async (id, price) => {
    await Orders.findByIdAndUpdate(id,
        {
            $set: {
                status: "completed",
                totalPrice: price
            }
        })
};

const deleteOrder = async () => {

};

module.exports = {
    get,
    post,
    put,
    deleteOrder
}