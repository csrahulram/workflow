var db;

module.exports = function (app, urlencodedParser, db) {
    this.db = db;
    app.post('/registration', urlencodedParser, function (req, res) {
        validate(req, res, (validation)=>{
            if(validation == true){
                register(req, res);
            }
        })
    });
}

function validate(req, res, callback){

    //Checks the username exists or not
    if(!req.body.username){
        var response = {};
        response.message = 'Bad request';
        response.detail = 'Username is not found. Please enter a username.';
        response.code = 400;
        response.data = null;
        res.send(response);
        callback(false);
    } else if(req.body.username.length <= 4){
        var response = {};
        response.message = 'Bad request';
        response.detail = 'Username must be above or equal to 4 characters.';
        response.code = 400;
        response.data = null;
        res.send(response);
        callback(false);
    } else if(req.body.username.length >= 20){
        var response = {};
        response.message = 'Bad request';
        response.detail = 'Username must be below or equal to 20 characters.';
        response.code = 400;
        response.data = null;
        res.send(response);
        callback(false);
    } else if()
}


function unique(req){

}