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
}