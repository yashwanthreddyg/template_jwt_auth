var express = require('express');
var router = express.Router();
var database = require('../database/index');
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send(database.getUsers());
});

module.exports = router;
