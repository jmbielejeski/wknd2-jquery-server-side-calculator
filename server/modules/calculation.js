const { builtinModules } = require('module');

function calculate(inputOne, operator, inputTwo) {
  console.log('performing calculation on ', inputOne, operator, inputTwo);

  let answer = '';

  if (operater === 'add') {
    answer = inputOne + inputTwo;
  } else if (operater === 'subtract') {
    answer = inputOne - inputTwo;
  } else if (operater === 'multiply') {
    answer = inputOne * inputTwo;
  } else if (operater === 'divide') {
    answer = inputOne / inputTwo;
  }
}

module.exports = calculate;
