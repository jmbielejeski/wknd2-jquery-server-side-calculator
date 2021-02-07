const express = require('express');
const storage = require('./modules/history');

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

  function calculate(inputOne, operator, inputTwo) {
    console.log('performing calculation on ', inputOne, operator, inputTwo);

    inputOne = Number(inputOne);
    console.log('input one is', inputOne);
    inputTwo = Number(inputTwo);
    console.log('input two is', inputTwo);
    let answer = '';

    if (operator === '+') {
      answer = inputOne + inputTwo;
    } else if (operator === '-') {
      answer = inputOne - inputTwo;
    } else if (operator === '*') {
      answer = inputOne * inputTwo;
    } else if (operator === '/') {
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

  storage.addToHistory(currentCalculation);
  console.log(storage.stored);

  res.sendStatus(200);
});

// get history to send to client.
app.get('/history', (req, res) => {
  console.log('in calculation History GET');
  console.log('storage is', storage.stored());
  res.send(storage.stored());
});
