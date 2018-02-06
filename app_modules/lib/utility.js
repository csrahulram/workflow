var _db;
var _app;
module.exports = (app, urlencodedParser, db) => {
    _db = db;
    _app = app;

    _app.unique = (collection, data, cb)=> {
        var query = {};
        query.collection = collection;
        query.data = data;
        _db.read(query, function (data) {
            if (data.length) {
                cb(false);
            } else {
                cb(true);
            }
        });
    }
}