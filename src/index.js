'use strict';

const $ = require('jquery');
const io = require('transport-methods');

// views
const view = {
  init() {
    const $userInput = $('#user-input');
    const $matrixInput = $('#matrix-input');
    const $resolveButton = $('<button id="resolveButton" class="btn btn-success">Resolver</button>');

    $resolveButton.on('click', (e) => {
      e.preventDefault();

      const $matrix = $matrixInput.find('table td');

      
    });

    $userInput.on('submit', (e) => {
      e.preventDefault();

      const destinationsNumber = +$userInput.find('#destinationsNumber').val();
      const originationsNumber = +$userInput.find('#originationsNumber').val();

      const $matrixTable = $(`
        <table class="table table-bordered">
          <thead>
            <tr>
              <th/>
            </tr>
          </thead>
          <tbody/>
        </table>
      `);


      for (let d = 0; d < destinationsNumber; d += 1) {
        $matrixTable.find('thead tr').append($('<th/>').text(`Destination ${d}`));
      }

      for (let o = 0; o < originationsNumber; o += 1) {
        const $row = $('<tr/>');

        $row.append($(`<td>Origination ${o}</td>`));

        for (let d = 0; d < destinationsNumber; d += 1) {
          $row.append($('<td/>').append($(`<input class"matrix-input-item" data-route="${o}${d}"/>`)));
        }

        $matrixTable
          .find('tbody').append($row);
      }

      $matrixInput
        .empty()
        .append($matrixTable)
        .append($resolveButton);
    });
  },
};


view.init();

// const matrix = io.transportMatrix(result);
//
// const resulting = matrix.resolveBy('northwestCorner');
