var db = db;
var mongo = require('mongodb');

module.exports.setDatabase = function (db_obj) {
    db = db_obj;
};

module.exports.read = function (query, cb) {
    var col = db.collection(query.collection);
    col.find(query.data).toArray(function (err, docs) {
        cb(docs);
    });
};

module.exports.create = function (query, cb) {
    var col = db.collection(query.collection);
    console.log(JSON.stringify(query.data));
    col.insertOne(query.data).then(function (err, docs) {
        console.log('Insert')
        console.log(err);
        cb(200);
    });
};

module.exports.delete = function (query, cb) {
    var col = db.collection(query.collection);
    console.log(query)
    col.deleteOne(query.data).then(function (err, docs) {
        console.log(docs);
        cb(200);
    });
};