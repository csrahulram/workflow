const Docs = require('express-api-doc');
const app = require('./app');
const docs = new Docs(app);
docs.generate({
  path: './docs/index.html'
});