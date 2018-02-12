var _app;
var _db;

var jwt = require('jsonwebtoken');

module.exports = function (app, urlencodedParser, db) {
    _app = app;
    _db = db;
    _app.post('/api/public/auth', urlencodedParser, function (req, res) {
        var response = {};
        response.code = 400;
        response.message = 'Bad Request';
        response.data = null;
        
        if(req.body.username == undefined || req.body.username == ''){
            response.detail = 'Username is not found in the request.';
            res.send(response);
            return;
        }

        if(req.body.password == undefined || req.body.password == ''){
            response.detail = 'Password is not found in the request.';
            res.send(response);
            return;
        }

        authenticate(req.body.username, req.body.password, req.session, (response)=>{
            res.send(response);
        });
    });
}

function authenticate(username, password, session, callback){
    var response = {};
    if(session.login == undefined){
        var query = {};
        query.collection = 'auth';
        query.data = {};
        query.data.username = username;
        query.data.password = password;
        _db.index(query, (result)=>{
            
            if(result.length){
                var token = jwt.sign({username:username, password:password}, _app.secret);
                var query = {};
                query.collection = 'users';
                query.data = {};
                query.data.username = username;

                _db.index(query, (list)=>{
                    response.code = 200;
                    response.message = 'OK';
                    response.detail = 'Login success.';
                    response.data = {'token':token, 'user':list[0]};
                    session.login = response;
                    callback(response);
                });
            } else {
                response.code = 401;
                response.message = 'Unauthorized';
                response.detail = 'Username and password does not match our database.';
                response.data = null;
                callback(response);
            }
        })
    } else {
        var query = {};
        query.collection = 'auth';
        query.data = {};
        query.data.username = username;
        query.data.password = password;
        _db.index(query, (result)=>{
            
            if(result.length){
                var token = jwt.sign({username:username, password:password}, 'workflow');
                var query = {};
                query.collection = 'users';
                query.data = {}
                query.data.username = username;

                _db.index(query, (list)=>{
                    response.code = 200;
                    response.message = 'OK';
                    response.detail = 'User already loggedin';
                    response.data = {'token':token, 'user':list[0]};

                    session.login = response;
                    callback(response);
                })
            } else {
                response.code = 401;
                response.message = 'Unauthorized';
                response.detail = 'Username and password does not match our database';
                response.data = null;
                delete session.login;
                callback(response);
            }
        })
    }
}