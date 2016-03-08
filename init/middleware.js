module.exports = function() {
    return (function(req, res, next) {
        res.errorApi = function(status, message) {
            var error = new Error(message);
            error.status = status;
            next(error);
        };
        next();
    })
}
