const productsRouter = require('./product');
const producttypesRouter = require('./producttype');
const usersRouter = require('./user');
const ordersRouter = require('./order');
const orderItemRouter = require("./orderItem")


function route(app) {
    app.use('/orderItem', orderItemRouter);
    app.use('/order', ordersRouter);
    app.use('/user', usersRouter);
    app.use('/producttypes', producttypesRouter);
    app.use('/products', productsRouter);
}

module.exports = route;
