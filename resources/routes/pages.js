const express = require('express');
const { index, home, register, login, logout } = require("../controllers/pages");

module.exports = express.Router().get('/', index) // get index page
    .get('/home', home) // Get home page
    .post('/login', login) // Post login data
    .post('/register', register) // Post register data
    .get('/logout', logout);  // Get logout page