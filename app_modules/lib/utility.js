var _db;
var _app;

var jwt = require('jsonwebtoken');

module.exports = (app, urlencodedParser, db) => {
    _db = db;
    _app = app;

    _app.unique = (collection, data, cb)=> {
        var query = {};
        query.collection = collection;
        query.data = data;
        _db.index(query, (data)=>{
            if (data.length) {
                cb(false);
            } else {
                cb(true);
            }
        });
    }


    _app.log = (data)=>{
        var query = {};
        query.collection = 'log';
        query.data = data;
        _db.insertOne(query, (data)=>{});
    }

    _app.roles = {
        admin:()=>{
            return 'admin';
        }
    }

    _app.verify = (token, callback)=>{
        jwt.verify(token, _app.secret, (err, data)=>{
            console.log(data);
        })
    }
}