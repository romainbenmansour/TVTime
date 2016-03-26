var Router = require('express').Router();

var needAuth = require('../helper/needAuth');

// get user devices
Router.get('/user/device', needAuth, function(req, res) {
    res.json(req.auth.user.devices);
});

// add one favorite to user
Router.post('/user/device', needAuth, function(req, res) {
    if (!req.body.device)
        return (res.errorApi(400, 'No device sent'));
    req.auth.user.update({
        $addToSet: {
            devices: req.body.device
        }
    }, function(err) {
        if (err)
            return (res.errorApi(500, 'Database error'));
        res.json({
            message: 'ok'
        });
    });
});

// delete favorite
Router.delete('/user/device/:id', needAuth, function(req, res) {
    req.auth.user.update({
        $pull: {
            devices: req.params.id
        }
    }, function(err) {
        if (err)
            return (res.errorApi(500, 'Database error'));
        res.json({
            message: 'ok'
        });
    });
});

module.exports = Router;
