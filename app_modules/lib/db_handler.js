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

module.exports.createOne = function (query, cb) {
    var col = db.collection(query.collection);
    console.log(JSON.stringify(query.data));
    col.insertOne(query.data).then(function (err, docs) {
        console.log('One document inserted successfully');
        console.log(docs);
        cb(docs);
    });
};

module.exports.delete = function (query, cb) {
    var col = db.collection(query.collection);
    col.deleteOne(query.data).then(function (err, docs) {
        
    });
};