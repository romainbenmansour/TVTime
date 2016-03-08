var app = require("express")();

require('mongoose').connect('mongodb://localhost/spectacle');

// some middleware
app.use(require('morgan')('dev')); // log
app.use(require('body-parser').urlencoded({
    extended: false
}));
app.use(require('body-parser').json()); // POST params

app.use(require('./init/middleware')()); // my middleware
require('./init/router')(app); // routes
require('./init/error')(app); // errors handler

require('./init/launcher')(app); // launch http
