const productsRouter = require('./product');
const producttypesRouter = require('./producttype');
const usersRouter = require('./user');


function route(app) {
    app.use('/user', usersRouter);
    app.use('/producttypes', producttypesRouter);
    app.use('/products', productsRouter);
}

module.exports = route;
