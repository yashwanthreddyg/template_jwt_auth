var database = {};
var mock = [{
    _id: 'abcd1',
    username: 'username1',
    password: 'password1'
}, {
    _id: 'abcd2',
    username: 'username2',
    password: 'password2'
}, {
    _id: 'abcd3',
    username: 'username3',
    password: 'password3'
}];
database.getUsers = function(cb) {
    cb(mock);
};
database.findUserByUsername = function(uname, cb) {
    var user = undefined;
    for (var i in mock) {
        if (mock[i].username == uname) {
            user = mock[i];
            break;
        }
    }
    if (!user) {
        cb(null, {
            message: 'user not found with uname \'' + uname + '\''
        });
        return;
    } else {
        cb(user, null);
    }
};

database.validateUser = function(uname, pswd, scb, ecb) {
    database.findUserByUsername(uname, function(res, err) {
        if (err) {
            ecb({
                message: 'User not found'
            });
        } else {
            if (res.password == pswd) {
                scb({
                    _id:res._id,
                    username:res.username
                });
            } else {
                ecb({
                    message: 'wrong password'
                });
            }
        }
    });
};
module.exports = database;
