var express = require('express');
var config = require('../../config.js');
var router = express.Router();
var database = require('../../database/index');
var jwt = require('jsonwebtoken');
/* GET users listing. */
router.use(function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.appsecret, function(err, decoded) {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
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
