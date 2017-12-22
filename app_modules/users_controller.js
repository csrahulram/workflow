module.exports = function (app, urlencodedParser, db) {
    app.post('/authenticate', urlencodedParser, function (req, res) {
        if (req.body.username && req.body.password) {
            var query = {};
            query.collection = 'users';
            query.data = { 'username': req.body.username, 'password': req.body.password }
            db.read(query, function (data) {
                if (data.length == 1) {
                    delete data[0].password;
                    req.session.userdata = data[0];
                    req.session.userstatus = 'loggedin';
                    res.send({ status: 200, message: 'Login success.', data: data[0] })
                } else {
                    res.send({ status: 404, message: 'Login failed.', data: {} })
                }
            })
        } else {
            res.send({ status: 500, message: 'Incorrect data or no data found.', data: {} })
        }
    });

    app.get('/signout', urlencodedParser, function (req, res) {
        if (req.session.userstatus == 'loggedin') {
            req.session.userstatus = '';
            var userInfo = req.session.userdata;
            req.session.userdata = {};
            res.send({ status: 200, message: 'User logged out successfully', data: userInfo })
        } else {
            res.send({ status: 404, message: 'No active user found!', data: {} });
        }
    });


    app.get('/getUser', urlencodedParser, function (req, res) {
        if (req.session.userstatus == 'loggedin') {
            res.send({ status: 200, message: 'Valid user', data: req.session.userdata });
        } else {
            res.send({ status: 404, message: 'Not active user found!', data: {} });
        }
    });

    app.get('/getAllUser', urlencodedParser, function (req, res) {
        if (req.session.userstatus == 'loggedin') {
            var query = {};
            query.collection = 'users';
            query.data = {}
            db.read(query, function (data) {
                console.log(data);
                res.send({ status: 200, message: 'List of all users', data: data });
            });
           
        } else {
            res.send({ status: 404, message: 'Please login to access this service', data: {} });
        }
    });

    app.post('/registerUser', urlencodedParser, function (req, res) {
        checkUserAvailable(req.body.username, function(user){
            if(!user.available){
                registerUser(req, res);
            } else {
                res.send({ status: 400, message: 'User already exists. Please choose a different username.', data: {} });
            }
        })
    });

    function registerUser(req, res){
        if (req.body.username &&
            req.body.password == req.body.re_password &&
            req.body.first_name &&
            req.body.last_name &&
            req.body.role &&
            req.body.gender) {

            var query = {};
            query.collection = 'users';
            query.data = {};

            query.data.username = req.body.username;
            query.data.password = req.body.password;
            query.data.first_name = req.body.first_name;
            query.data.last_name = req.body.last_name;
            query.data.gender = req.body.gender;
            query.data.description = req.body.description || '';
            query.data.status = req.body.status;
            query.data.phone = req.body.phone;
            query.data.email = req.body.email;
            query.data.profile_pic = req.body.profile_pic;
            query.data.role = parseInt(req.body.role);
            query.data.created_on = Date.now().toString();
            query.data.modified_on = Date.now().toString();

            db.create(query, function (data) {
                if (data == 200) {
                    res.send({ status: 200, message: 'User registered successfully', data: {} });
                } else {
                    res.send({ status: 400, message: 'Registration failed. Please try again.', data: {} });
                }
            });

        } else {
            res.send({ status: 400, message: 'Bad request', data: {} });
        }
    }

    app.delete('/deleteUser', urlencodedParser, function (req, res) {
        if (req.body.username) {
            if (req.session.userstatus == 'loggedin') {
            var query = {}; 
            query.collection = 'users';
            query.data = {};
            query.data.username = req.body.username;
            db.delete(query, function (data) {
                if (data == 200) {
                    res.send({ status: 200, message: 'User deleted successfully.', data: {} });
                } else {
                    res.send({ status: 404, message: 'No user found.', data: {} });
                }
            });
        } else {
            res.send({ status: 403, message: 'Please loggin to delete the user', data: {} });
        }
        } else {
            res.send({ status: 400, message: 'Incorrect data. Please send correct user ID.', data: {} });
        }
    });

    app.post('/resetPassword', urlencodedParser, function(req, res){

    })

    function checkUserAvailable(username, callback){
        var query = {};
        query.collection = 'users';
        query.data = {};
        query.data.username = username;
        db.read(query, function(data){
            if(data.length){
                callback({"available":true});
            } else {
                callback({"available":false});
            }
        })
    }
}