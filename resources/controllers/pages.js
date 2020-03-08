const User = require('../models/User');
const bcryptjs = require('bcryptjs');

const index = (req, res) => {
    let user = req.session.user;
    // If there is a session named user that means the user is loggedin, so we redirect him to home page by using /home route below
    if(user) {
        res.redirect('/home');
        return;
    }
    // IF not we just send the index page.
    res.render('index', {title:"My application"});
};

const home = (req, res) => {
    let user = req.session.user;
    
    if(user) {
        res.render('home', {opp:req.session.opp, name:user.fullName});
        return;
    }
    res.redirect('/');
};

const login = async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    
    if (!user) return res.send('Username not found!');
    
    if(!await bcryptjs.compare(req.body.password, user.password)) return res.send('Username/Password incorrect!');

    req.session.user = user;
    req.session.opp = 1;
    res.redirect('/home');
};

const register = async (req, res) => {
    req.body.password = await bcryptjs.hash(req.body.password, 10);

    const userInput = {
        username: req.body.username,
        fullName: req.body.fullname,
        password: req.body.password
    };

    try {
        const user = await User.create(userInput);
        req.session.user = user;
        req.session.opp = 0;
        res.redirect('/home');
    } catch (err) {
        err.name === 'MongoError' ? res.send('Usuário já existe') : err.errmsg;
    }
};

const logout = (req, res) => {
    if(req.session.user) {
        req.session.destroy(function () {
            res.redirect('/');
        });
    }
}

module.exports = {
    index,
    home,
    login,
    register,
    logout
}