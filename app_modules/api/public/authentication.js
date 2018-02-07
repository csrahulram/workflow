var _app;

module.exports = function (app, urlencodedParser, db) {
    _app = app;
    _app.post('/api/public/auth', urlencodedParser, function (req, res) {
        var response = {};
        response.code = 400;
        response.message = 'Bad Request';
        response.data = null;
        
        if(req.body.username == undefined){
            response.detail = 'Username is not found in the request.';
            res.send(response);
            return;
        }

        if(req.body.password == undefined){
            response.detail = 'Password is not found in the request.';
            res.send(response);
            return;
        }
        if(!_app.login()){
            _app.loginAs(req.body.username, req.body.password)
        }
    });
}