var Router = require('express').Router(),
    _ = require('lodash');

var needAuth = require('../helper/needAuth'),
    UserModel = require('../models/user');

// set new params
//
Router.post('/user/params', needAuth, function(req, res) {
    var newParams = createParamsArray(req.body);

    for (var i = 0; i < newParams.length; i++) {
        var elem = _.find(req.auth.user.params, {'key': newParams[i].key});

        if (elem)
            elem.value = newParams[i].value;
        else {
            req.auth.user.params.push(newParams[i]);
        }
    }
    req.auth.user.save(function(err) {
        if (err) {
            console.error(err);
            return (res.errorApi(500, 'Database error'));
        }
        res.json(req.auth.user.params);
    });
});

Router.get('/user/params', needAuth, function(req, res) {
    res.json(req.auth.user.params);
});


// create new params collection out of request
function createParamsArray(reqBody) {
    var params = [];

    for (var key in reqBody) {
        var newParam = {
            key: key,
            value: reqBody[key]
        };
        params.push(newParam);
    }
    return (params);
}

module.exports = Router;
