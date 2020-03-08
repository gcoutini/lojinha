const express = require('express');
const session = require('express-session');
const path = require('path');
const pageRouter = require('../resources/routes/pages.js');
const mongoose = require('./mongoose');
const app = express();

// for body parser
app.use(express.urlencoded( { extended : false}));

// serve static files
app.use(express.static(path.join(__dirname, '../resources/public')));

// template engine
app.set('views', path.join(__dirname, '../resources/views'));
app.set('view engine', 'pug');

// session
app.use(session({
    secret:'youtube_video',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 1000 * 30
    }
}));

mongoose();

// routers
app.use('/', pageRouter);

// errors: page not found 404
app.use((req, res, next) =>  {
    var err = new Error('Page not found');
    err.status = 404;
    next(err);
})

// Handling errors (send them to the client)
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
});

// setting up the server

module.exports = app;