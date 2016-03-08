var auth = require('basic-auth'),
    mongoose = require('mongoose');

var UserModel = require('../models/user');

// middleware to call during route definition, it populate req.user if basic auth is ok, otherwise, return 401
module.exports = function(req, res, next) {
    var credentials = auth(req);

    if (!mongoose.Types.ObjectId.isValid(credentials.name))
        return (res.errorApi(401, 'Need to auth'));
    UserModel.findOne({
        _id: mongoose.Types.ObjectId(credentials.name),
        'auth_tokens.value': credentials.pass
    }, function(err, data) {
        if (err) {
            return (res.errorApi(500, 'Error database'));
        } else if (data) {
            req.auth = {
                user: data,
                token: credentials.pass
            };
            next();
        } else {
            return (res.errorApi(401, 'Need to auth'));
        }
    });
}
