const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(bodyParser.json());

// Routes
app.use(require('./api'));

// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});