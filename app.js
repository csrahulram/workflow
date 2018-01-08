var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var app = express();
var db = require('./app_modules/db_handler.js');
var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');

var session = require('express-session');

app.use(session({ secret: "workflow" }));

require('./app_modules/users_controller')(app, urlencodedParser, db, jsonParser);

var uri = "mongodb://localhost:27017/workflow";

MongoClient.connect(uri, function (err, db_obj) {
    db.setDatabase(db_obj);
    db_obj.listCollections().toArray(function (err, data) {
        if (!data.length) {
            fs.readdirSync('schema', "utf8").forEach(function (schema) {
                var doc = fs.readFileSync('./schema/' + schema, 'utf8');
                var json = JSON.parse(doc);
                //if (json.validator) {
                    db_obj.createCollection(schema.replace('.json', ''), json);
                //}
            });
        }
    });
});



app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/docs'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/docs', function (req, res) {
    res.sendFile(__dirname + '/docs/index.html');
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});

var html = ''
app._router.stack.forEach(function (methods) {
    if (methods.route) {
        html += '<div>';
        html += ''
        html += '<h3>Path :' +  methods.route.path + '</h3>';
        for(var i in methods.route.methods){
            html += '<h4>Type:' + i + '</h4>';
        }

        html += '</div>';
    }
});

fs.writeFile('./docs/index.html', html);

module.exports = app;