console.log('in client js');

// test what the mathematical inputs do

$(document).ready(onReady);

function onReady() {
  console.log('so ready');

  getHistory();

  // run the calculate function on click of equalBtn
  $(document).on('click', '#equalBtn', calculate);

  $(document).on('click', '.operationButton', setOperation);
}

function getHistory() {
  $.ajax({
    method: 'GET',
    url: '/history',
  })
    .then(function (calculationHistory) {
      // got a response
      console.log('got a response', calculationHistory);

      //take array of history
      // loop through them

      for (let calculation of calculationHistory) {
        //append to DOM
        $('#history').append(`
        <li>
        ${calculation}
        </li>
      `);
      }
    })

    // catch to alert if something goes wrong
    .catch(function () {
      alert('something went wrong');
    });
}

let operation = '';

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

  // displayCalculation();
}
