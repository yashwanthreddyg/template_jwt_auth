var express = require('express');
var config = require('../../config.js');
var router = express.Router();
var jwt = require('jsonwebtoken');
var db = require('../../database');
router.post('/', function(req, res) {
    if(req.body.username && req.body.password){
        db.validateUser(req.body.username,req.body.password,null,null);
    }
    if (req.body.username == 'username' && req.body.password == 'password') {
        var secret = config.appsecret;
        var token = jwt.sign("validuser", secret, {
            expiresInMinutes: 1440 // expires in 24 hours
        });
        res.json({
            success: true,
            token: token
        });
    } else {
        res.json({
            success: false,
            message: 'Authentication failed. Wrong password.'
        });
    }
});
module.exports = router;
