const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Connecting local mongoose server
mongoose.connect('mongodb://localhost:27017/workflow', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
var kittySchema = new mongoose.Schema({
  name: String,
});

kittySchema.methods.speak = function() {
  var greeting = this.name
    ? 'Meow name is ' + this.name
    : "I don't have a name";
  console.log(greeting);
};

var Kitten = mongoose.model('Kitten', kittySchema);

var connection = 'Awaiting connection...';

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  
  // var silence = new Kitten({ name: 'Silence' });
  connection = 'Database connection success';
});

// Use cors extention for app debug purpose
app.use(cors(corsOptions));

// Access to the dist folder for permission
app.use(express.static(__dirname + '/dist/workflow/'));

// Root will return index.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/workflow/index.html');
});

app.get('/api/handshake', (req, res) => {
  

  res.send({
    status: 200,
    message: 'success',
    data: 'Express communication success',
  });
});

app.get('/api/database', (req, res)=>{
  res.send({
    status: 200,
    message: 'success',
    data: connection
  })
})

// App listern for the mentioned port no
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
