/*This module accepts the registration information only after validating and 
checking the unique validation and thus registers the date to database.*/

var _db;
var _app;

module.exports = (app, urlencodedParser, db) => {
    _db = db;
    _app = app;
    _app.post('/api/public/registration', urlencodedParser, (req, res) => {
        validate(req, res, (validation)=>{
            if(validation.code == 200){
                _app.unique('users', {username:req.body.username}, (unique)=>{
                    if(unique){
                        register(req, res, (registration)=>{
                            res.send(registration);
                            var log = {};
                            log.type = 'Registration'
                            log.subject = 'New user registration.'
                            log.time = Date.now();
                            _app.log(log);
                        })
                    } else {
                        var unique = {};
                        unique.code = 409;
                        unique.message = 'Internal conflict';
                        unique.data = null;
                        unique.detail = 'Username already exists.'
                        res.send(unique);
                    }
                })
            } else {
                res.send(validation);
            }
        });
    });
}

function validate(req, res, callback) {
    var response = {};
    response.message = 'Bad request';
    response.code = 400;
    response.data = null;

    if (!req.body.username) {
        response.detail = 'Username is not found. Please enter a username.';
    } else if (req.body.username.length <= 3) {
        response.detail = 'Username must be above or equal to 4 characters.';
    } else if (req.body.username.length >= 20) {
        response.detail = 'Username must be below or equal to 20 characters.';
    } else if (!req.body.password) {
        response.detail = 'Password is not found. Please enter a password.';
    } else if (req.body.password.length <= 4) {
        response.detail = 'Password must be above or equal to 4 characters.';
    } else if (req.body.password.length >= 20) {
        response.detail = 'Password must be below or equal to 20 characters.';
    } else if (!req.body.confirm_password) {
        response.detail = 'Confirm password is not found.';
    } else if (req.body.confirm_password != req.body.password) {
        response.detail = 'Confirm password does not match.';
    } else if (!req.body.email) {
        response.detail = 'Email is not found. Please enter a valid email.';
    } else {
        response.message = 'OK';
        response.code = 200;
        response.detail = 'All information are valid.';
    }

    callback(response);
}

function register(req, res, callback) {
    var query = {};
    query.collection = 'users';
    query.data = {};
    query.data.username = req.body.username;
    query.data.email = req.body.email;
    _db.insertOne(query, (data)=>{
        var query = {};
        query.collection = 'auth';
        query.data = {};
        query.data.username = req.body.username;
        query.data.password = req.body.password;
        query.data.role = _app.roles.admin();
        _db.insertOne(query, (data)=>{
            var response = {};
            response.message = 'Created';
            response.code = 201;
            response.detail = 'User successfully registered.';
            response.data = {};
            callback(response);
        });
    });
}