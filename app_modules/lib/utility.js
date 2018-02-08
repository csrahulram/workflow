var _db;
var _app;

var jwt = require('jsonwebtoken');

var token = jwt.sign({username:'Rahul', password:'ram123'}, 'app-secret');

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
}