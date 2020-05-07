const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect(`mongodb://${process.env.MUSER}:${process.env.MPASSWORD}@${process.env.MHOST}:${process.env.MPORT}/${process.env.MDATABASE}?authSource=admin`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
  } catch (e) {
    console.trace(e);
  }
})();

const Users = require('./models/Users.js');
const Answers = require('./models/Answers.js');
const Order_items = require('./models/Order_items.js');
const Orders = require('./models/Orders.js');
const Products = require('./models/Products.js');
const Providers = require('./models/Providers.js');
const Questions = require('./models/Questions.js');
const Reviews = require('./models/Reviews.js');


module.exports = {
  Answers,
  Order_items,
  Users,
  Orders,
  Products,
  Providers,
  Questions,
  Reviews
}