console.log('in client js');

// test what the mathematical inputs do

$(document).ready(onReady);

function onReady() {
  console.log('so ready');

  // run the calculate function on click of equalBtn
  $(document).on('click', '#equalBtn', calculate);

  $(document).on('click', '.operationButton', setOperation);

  $(document).on('click', '#clearInput', clearInputs);

  getHistory();
}

function getHistory() {
  $.ajax({
    method: 'GET',
    url: '/history',
  })
    .then(function (calculationHistory) {
      // got a response
      console.log('got a response', calculationHistory);

      render(calculationHistory);

      // catch to alert if something goes wrong
    })
    .catch(function () {
      alert('something went wrong');
    });
}

//sets operation to empty string
let operation = '';
// pulls in what the operation is based on what was clicked
function setOperation(event) {
  event.preventDefault();
  operation = $(this).data('operation');
}

// get inputs from DOM
// send them to server for calculation

function calculate() {
  console.log('in calculate function');

  // grab the operator being clicked
  // console.log(operator);

  //put all info into an object
  let newCalculation = {
    // get first input
    firstInput: $('#firstInput').val(),
    secondInput: $('#secondInput').val(),
    operator: operation,
  };
  console.log(newCalculation);

  $.ajax({
    url: '/history',
    method: 'POST',
    data: {
      calculation_to_run: newCalculation,
    },
  })
    .then(function (response) {
      console.log('it worked', response);
    })
    .catch(function (error) {
      console.log('something went wrong', error);
    });
  getHistory();
}

function render(historyData) {
  console.log('historyData is ', historyData);

  $('#history').empty();

  // this is the same as the answer
  let firstObject = '';

  //loop over array of objects to find correct objects
  for (let i = 0; i < historyData.length; i++) {
    firstObject = historyData[i];
    // console.log('firstObject at firstInput is ', firstObject.firstInput);
    $('#history').append(`
  <ul>
    <li>
      ${firstObject.firstInput} ${firstObject.operator} ${firstObject.secondInput} = ${firstObject.answer}
    </li>
  </ul>
`);
  }

  // console.log('firstObject is', firstObject);

  // history data is coming back as an array of objects.
  // need to get the first object in the array.

  // append to answer
  $('#calculation').empty();
  $('#calculation').append(`
    The answer is: ${firstObject.answer}
  `);
  clearInputs();
}

function clearInputs() {
  // clear inputs
  $('#firstInput').val('');
  $('#secondInput').val('');
}

function renderHistory() {}
