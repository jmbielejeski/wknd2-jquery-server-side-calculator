const express = require('express');
const bodyParser = require('body-parser');

const calculate = require('./modules/calculation');

// Create our app
const app = express();
const port = 5000;

// INCANTATION:
// Share any files inside the "./server/public" folder
app.use(express.static('server/public'));

// **** OPTIONAL BODY PARSER USAGE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Listen for network requests
app.listen(port, function () {
  // When the server is ready, call this function
  console.log(`I'm listening.... `, port);
});

// history array of objects
let calculationHistory = ['test'];
// get history to send to client.
app.get('/history', (req, res) => {
  console.log('in calculationHistory GET');
  res.send(calculationHistory);
});
