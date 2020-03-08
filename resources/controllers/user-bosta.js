const pool = require('../../core/pool');
const bcryptjs = require('bcryptjs');


function User() {};

User.prototype = {
    //Find user data by id or username
    find : function(user = null, callback)
    {
        // if user variable is defined
        if(user) {
            //if user = number return field = id, if user = string return field = username
            var field = Number.isInteger(user) ? 'id' : 'username';
        }
        
        // prepare the sql query
        let sql = `SELECT * FROM users WHERE ${field} = ?`;


        pool.query(sql, user, function(err, result) {
            if(err) throw err

            if(result.length) {
                callback(result[0]);
            } else {
            callback(null);
            }
        });
    },

    // This function will insert data into the database. (create a new user)
    // body is an object
    create : function(body, callback)
    {
        
        var pwd = body.password;
        // Hash the password before insert it into the database.
        body.password = bcryptjs.hashSync(pwd,10);

        // This array will contain the values of the fields.
        var bind = [];
        // loop in the attributes of the object and push the values into the bind array.
        for(prop in body) {
            bind.push(body[prop]);
        }
        // prepare the sql query
        let sql = `INSERT INTO users(username, fullname, password) VALUES (?, ?, ?)`;
        // call the query, give it the sql string and the values (bind array)
        pool.query(sql, bind, function(err, result) {
            if(err) throw err;
            // return the last inserted ID, if there is no error
            callback(result.insertId);
        });
    },

    login : function(username, password, callback)
    {
        // find the user data by his username
        this.find(username, function(user) {
            // if there is a user by this username.
            if(user) {
                // now we check his password
                if(bcryptjs.compareSync(password, user.password)) {
                    // return his data.
                    callback(user);
                    return;
                }
            }
            // if the username/password is wrong then return null.
            callback(null);
        });
        
    }
}


module.exports = User;