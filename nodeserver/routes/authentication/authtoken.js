var db = require('../../database');
var config = require('../../config.js');
var jwt = require('jsonwebtoken');
var auth = {};
auth.getToken = function(uname, pswd, scb, ecb) {
    var success = function(user) {
        var secret = config.appsecret;
        var token = jwt.sign(user, secret, {
            expiresInMinutes: 1440 // expires in 24 hours
        });
        scb({
            success: true,
            token: token
        });
    };
    var failure = function(err) {
        ecb(err);
    }
    db.validateUser(uname, pswd, success, failure);
}
auth.verifyToken = function(token, scb, ecb) {
    jwt.verify(token, config.appsecret, function(err, decoded) {
        if (err) {
            ecb(err);
        } else {
            // if everything is good, save to request for use in other routes
            scb(decoded);
        }
    });
}

module.exports = auth;
