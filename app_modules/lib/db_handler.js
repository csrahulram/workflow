var db = db;
var mongo = require('mongodb');

module.exports.setDatabase = function (db_obj) {
    db = db_obj;
};

module.exports.index = function (query, cb) {
    var col = db.collection(query.collection);
    col.find(query.data).toArray(function (err, docs) {
        cb(docs);
    });
};

module.exports.insertOne = function (query, cb) {
    var col = db.collection(query.collection);
    col.insert(query.data, (err, docs)=>{
        cb(docs);
    });
};

module.exports.insertMany = function (query, cb) {
    var col = db.collection(query.collection);
    col.insertMany(query.data).then(function (err, docs) {
        cb(docs);
    });
};

module.exports.updateOne = function (query, cb) {
    var col = db.collection(query.collection);
    col.updateOne(query.data).then(function (err, docs) {
        cb(docs);
    });
};

module.exports.updateMany = function (query, cb) {
    var col = db.collection(query.collection);
    col.updateMany(query.data).then(function (err, docs) {
        cb(docs);
    });
};

module.exports.deleteOne = function (query, cb) {
    var col = db.collection(query.collection);
    col.deleteOne(query.data).then(function (err, docs) {
        cb(docs);
    });
};

module.exports.deleteMany = function (query, cb) {
    var col = db.collection(query.collection);
    col.deleteMany(query.data).then(function (err, docs) {
        cb(docs);
    });
};