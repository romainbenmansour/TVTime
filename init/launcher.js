var http = require('http'),
    config = require('../config');

function onHttpError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }

    switch (error.code) {
        case 'EACCES':
            console.error('Port ' + config.port + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error('Port ' + config.port + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    console.log('Listening on port ' + config.port);
}

module.exports = function(app) {
    var server = http.createServer(app);

    server.listen(config.port);
    server.on('error', onHttpError);
    server.on('listening', onListening);
};
