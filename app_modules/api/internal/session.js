var _app;
var _db;

module.exports = function (app, urlencodedParser, db) {
    _app = app;
    _db = db;

    _app.post('/api/internal/logout', urlencodedParser, function (req, res) {
        console.log(req.get('token'));
        var response = {};
        if(req.session.login){
            if(req.get('token')){
                _app.verify(req.get('token'), (valid)=>{
                    if(valid){
                        response.code = 200;
                        response.message = 'OK';
                        response.detail = 'Logout success.';
                        response.data = null;
                    } else {
                        response.code = 401;
                        response.message = 'Bad request';
                        response.detail = 'Invalid token.';
                        response.data = null;
                    }
                    res.send(response);
                })
                
            } else {
                response.code = 400;
                response.message = 'Bad request';
                response.detail = 'Token not found in this request.';
                response.data = null;
                res.send(response);
            }
            
        } else {
            response.code = 401;
            response.message = 'Unauthorized';
            response.detail = 'Unauthorized use of this service. Please login to use this service.';
            response.data = null;
            res.send(response);
        }
    });
}