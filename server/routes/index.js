const Router = require('express')();

const UsersController = require('../Users/controllers.js');

const AnswersController = require('../controllers/Answers/controllers.js');
const OrderItemsController = require('../controllers/Order_Items/controllers.js');
const OrdersController = require('../controllers/Orders/controllers.js');
const ProductsController = require('../controllers/Products/controllers.js');
const ProvidersController = require('../controllers/Providers/controllers.js');
const QuestionsController = require('../controllers/Questions/controllers.js');
const ReviewsController = require('../controllers/Reviews/controllers.js');


Router.use('/users', UsersController);

Router.use('/answers', AnswersController);
Router.use('/orderItems', OrderItemsController);
Router.use('/orders', OrdersController);
Router.use('/products', ProductsController);
Router.use('/provider', ProvidersController);
Router.use('/questions', QuestionsController);
Router.use('/reviews', ReviewsController);

module.exports = Router;