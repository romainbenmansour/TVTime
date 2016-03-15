var Router = require('express').Router(),
    FB = require('facebook-node'),
    randomstring = require('randomstring').generate;

var UserModel = require('../models/user'),
    config = require('../config'),
    needAuth = require('../helper/needAuth');

// route for login with facebook, here's the step
// 1 - check if request is acceptable with POST params
// 2 - request to facebook api, endpoint = /me with fields to get infos
// 3 - check what facebook send back, compare it to profile_id sent by user
// 4 - check if user has an account already
// 5 - if user exist, connect
// 6 - if user doesnt exist, register him
Router.post('/user/login/facebook', function(req, res, next) {
    if (req.body.profile_id && req.body.access_token) { // 1
        FB.api('me', { // 2
            fields: ['id', 'email', 'gender', 'first_name', 'last_name'],
            access_token: req.body.access_token
        }, function(data) {
            if (!data || data.error)
                return (res.errorApi(400, 'Bad access token'));
            if (req.body.profile_id != data.id) // 3
                return (res.errorApi(400, 'Wrong profile id'));
            getUserEmail(data.email, function(err, user) { // 4
                if (err)
                    return (res.errorApi(500, 'Database error'));
                else if (user) // 5
                    logUser(user, res);
                else // 6
                    registerUser(data, res);
            });
        });
    } else {
        return (res.errorApi(400, 'You need to send profile_id and access_token as POST params'));
    }
});

// route for logout
// 1 - delete token with mongo request
// 2 - send ok
Router.get('/user/logout', needAuth, function(req, res) {
    req.auth.user.update({
        $pull: {
            auth_tokens: {
                value: req.auth.token
            }
        }
    }, function(err) {
        if (err)
            return (res.errorApi(500, 'Database error'));
        res.json({
            message: 'ok'
        });
    })
});

Router.get('/user/me', needAuth, function(req, res) {
    var user = req.auth.user;

    res.json({
        last_name: user.last_name,
        first_name: user.first_name,
        gender: user.gender,
        email: user.email,
        favorites: user.favorites
    });
});

Router.delete('/user', needAuth, function(req, res) {
    UserModel.remove({
        _id: req.auth.user._id
    }, function(err) {
        if (err) {
            console.error(err);
            return (res.errorApi(500, 'Database error'));
        }
        res.json({
            message: 'ok'
        })
    });
});

// get user document
function getUserEmail(email, callback) {
    UserModel.findOne({
        email: email
    }, callback);
}

// function to log a user with token creation
// 1 - generate token
// 2 - insert token in user model
// 3 - http respond with id and token
function logUser(userData, res) {
    var token = { // 1
        value: randomstring(config.size_token)
    };

    userData.update({ // 2
        '$push': {
            auth_tokens: token
        }
    }, function(err) {
        if (err)
            return (res.errorApi(500, 'Database error'));
        res.json({ // 3
            id: userData._id,
            token: token.value
        });
    });
}

// function to register and log a user
// 1 - create user following model
// 2 - save it
// 3 - log him
function registerUser(userData, res) {
    userData.facebook_id = userData.id;
    var newUser = new UserModel(userData); // 1

    newUser.save(function(err, data) { // 2
        if (err)
            return (res.errorApi(500, 'Database error'));
        logUser(data, res); // 3
    });
}

module.exports = Router;
