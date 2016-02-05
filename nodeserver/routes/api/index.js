var express = require('express');
var config = require('../../config.js');
var router = express.Router();
var database = require('../../database');
var authorizer = require('../authentication/authtoken.js');
var jwt = require('jsonwebtoken');
/* GET users listing. */
router.use(function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        var success = function(decoded) {
            console.log("decoded: "+JSON.stringify(decoded));
            req.decoded = decoded;
            next();
        }
        var failure = function(err) {
            res.status(400).json({
                success: false,
                message: 'Failed to authenticate token.'
            });
        }
        authorizer.verifyToken(token, success, failure);
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});
router.get('/', function(req, res, next) {
    res.json({
        message: 'welcome to the api'
    });
});

module.exports = router;
