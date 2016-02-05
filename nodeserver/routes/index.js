var express = require('express');
var router = express.Router();
var authenticate = require('./authentication');
var api = require('./api');
var config = require('../config.js');
//var app = require('../app.js');
//var users = require('./users');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.use('/auth', authenticate);
router.use('/api', api);

module.exports = router;
