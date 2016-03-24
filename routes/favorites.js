var Router = require('express').Router();

var ShowDB = require('../models/show'),
    UserDB = require('../models/user'),
    needAuth = require('../helper/needAuth');

// add show to the DB
function createShow(id, raw) {
    var newShow = new ShowDB({
        _id: id,
        data: raw
    });
    newShow.save(function(err) {
        if (err)
            console.error(err);
    });
}

// update show
function updateShow(show, raw) {
    show.data = raw;

    show.save(function(err) {
        if (err)
            console.error(err);
    });
}

// get user favorites
Router.get('/user/favorites', needAuth, function(req, res) {
    UserDB
        .findOne({
            _id: req.auth.user.id
        })
        .select('favorites')
        .populate('favorites')
        .exec(function(err, data) {
            if (err)
                return (res.errorApi(500, 'Database error'));
            res.json(data.favorites);
        });
});

// add one favorite to user
Router.post('/user/favorites', needAuth, function(req, res) {
    if (!req.body.data) {
        return (res.errorApi(400, 'No data sent'));
    }
    try {
        var data = JSON.parse(req.body.data);

        if (!data.id)
            return (res.errorApi(400, 'No data sent'));
        ShowDB.findOne({
            _id: data.id
        }, function(err, show) {
            if (err)
                return (res.errorApi(500, 'Database error'));
            if (!show)
                createShow(data.id, req.body.data);
            else
                updateShow(show, req.body.data);
            req.auth.user.update({
                $addToSet: {
                    favorites: data.id
                }
            }, function(err) {
                if (err)
                    return (res.errorApi(500, 'Database error'));
                res.json({
                    message: 'ok'
                });
            });
        });
    } catch (e) {
        return (res.errorApi(400, 'Bad data sent'));
    }
});

// delete favorite
Router.delete('/user/favorites/:id', needAuth, function(req, res) {
    req.auth.user.update({
        $pull: {
            favorites: req.params.id
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
