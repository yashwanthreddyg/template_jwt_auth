var express = require('express');
var router = express.Router();
var db = require(process.cwd()+'/database');

router.post('/',function(req,res){
    function success(){
        res.json({success:true});
    };
    function error(err){
        res.json({
            success:false,
            message:err.message
        });
    };
    db.registerUser(req.body.username,req.body.password,success,error);
});

module.exports = router;
