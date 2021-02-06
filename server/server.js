const express = require('express');
// const calculate = require('./modules/calculation');

// Create our app
const app = express();
const PORT = 5000;

// Share any files inside the 'public' folder
app.use(express.static('server/public'));
// INCANTATION
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});

// history array of objects
let calculationHistory = [];
// get history to send to client.
app.get('/history', (req, res) => {
  console.log('in calculation History GET');
  res.send(calculationHistory);
});

let completeCalculation = '';

app.post('/history', (req, res) => {
  console.log('in operation POST');
  // check if received data is undefined
  if (req.body.calculation_to_run === undefined) {
    console.log('oops something is wrong');
    res.sendStatus(400);
    return;
  }

  // define received data for easier reference
  let currentCalculation = req.body.calculation_to_run;
  console.log(currentCalculation);

  let answer = '';

  function calculate(inputOne, operator, inputTwo) {
    console.log('performing calculation on ', inputOne, operator, inputTwo);

    inputOne = Number(inputOne);
    inputTwo = Number(inputTwo);

    if (operator === 'add') {
      answer = inputOne + inputTwo;
    } else if (operator === 'subtract') {
      answer = inputOne - inputTwo;
    } else if (operator === 'multiply') {
      answer = inputOne * inputTwo;
    } else if (operator === 'divide') {
      answer = inputOne / inputTwo;
    }
    return answer;
  }

  let completeCalculation = calculate(
    currentCalculation.firstInput,
    currentCalculation.operator,
    currentCalculation.secondInput
  );

  console.log(completeCalculation);

  currentCalculation.answer = completeCalculation;

  calculationHistory.push(currentCalculation);
  console.log(calculationHistory);

  res.sendStatus(200);
});
