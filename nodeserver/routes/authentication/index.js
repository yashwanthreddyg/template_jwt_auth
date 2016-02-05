var express = require('express');
var config = require('../../config.js');
var router = express.Router();
var jwt = require('jsonwebtoken');
var db = require('../../database');
var authorizer = require('./authtoken.js');

router.post('/', function(req, res) {
    if (req.body.username && req.body.password) {
        var success = function(token) {
            res.send(token);
        };
        var failure = function(err) {
            res.send(err);
        }
        authorizer.getToken(req.body.username, req.body.password, success, failure);
    }
});
module.exports = router;
