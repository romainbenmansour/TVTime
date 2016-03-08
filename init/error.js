var config = require('../config');

function error404(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
}

function error(err, req, res, next) {
    res.status(err.status || 500);
    res.json({'message': err.message});
}

function errorProd(err, req, res, next) {
    var message = err.message;

    if (!err.status) {
        message = 'Error server side';
        res.status(500);
    }
    res.json({message: message});
}

module.exports = function(app) {
    app.use(error404);
    if (config.mode == 'dev')
        app.use(error);
    else
        app.use(errorProd);
};
