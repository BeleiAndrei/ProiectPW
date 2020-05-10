const {
    Products,
    Providers,
    Answers,
    Questions,
    Reviews
} = require('../../data');

const get = async (querry) => {
    return await Products.find(querry).populate('provider', 'name -_id')
};

const getAndPopulate = async(_id) => {
    let ret = {};
    ret.Product = await Products.findById(_id).populate('provider', 'name -_id');
    ret.Questions = await Questions.find({"product_id": _id}).populate('user_id', 'username email -_id');
    ret.Reviews = await Reviews.find({"product_id": _id}).populate('user_id', 'username email -_id');;

    for (let i = 0; i < ret.Questions.length; ++i) {
        const answers = await Answers.find({"question_id": ret.Questions[i]._id}).populate('user_id', 'username email -_id')
        ret.Questions[i] = {
            _id: ret.Questions[i]._id,
            user_id: ret.Questions[i].user_id,
            product_id: ret.Questions[i].product_id,
            important: ret.Questions[i].important,
            message: ret.Questions[i].message,
            Answers: answers
        };
    }

    return ret;
}

const post = async (name, description, price, provider) => {
    let Provider = await Providers.findOne( { 'name': provider});

    if (Provider === null) {
        Provider = new Providers ({
            name: provider
        });
        await Provider.save();
    }

    //TODO IMAGE
    const Product = new Products({
        name: name,
        description: description,
        price: price,
        provider: Provider._id
    });

    await Product.save();
};

const put = async (id, description, price) => {

    await Products.findByIdAndUpdate(id, 
        {
            'price': price,
            'description': description
        }
    );
};

const deleteProduct = async (id) => {
    console.log(id);
    await Products.findByIdAndDelete(id);
};

module.exports = {
    get,
    post,
    put,
    deleteProduct,
    getAndPopulate
}