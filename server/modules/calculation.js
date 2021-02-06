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
  console.log(answer);
}

module.exports = calculate;
