const calculator =  {
    result: NaN,
    input: '0',
    operator: null,
}

const output = document.querySelector('#input');

/* Number Buttons */
const numberButtons = document.querySelectorAll('.number-button');
numberButtons.forEach( (number) => {
    number.addEventListener('click', () => {
        if (output.textContent === '0') {
            calculator.input = number.textContent;

        } else {
            calculator.input += number.textContent;
        }
        output.textContent = calculator.input;
    });
});


function calculate(op) {
    switch (op) {
        case '+':
            return calculator.result + Number.parseFloat(calculator.input);
        case '−':
            return calculator.result - Number.parseFloat(calculator.input);
        case '×':
            return calculator.result * Number.parseFloat(calculator.input);
        case '÷':
            return calculator.result / Number.parseFloat(calculator.input);
    }
}

const operatorButtons = document.querySelectorAll('.operator-button');
operatorButtons.forEach( (op) => {
    op.addEventListener('click', () => {
        equals();
        calculator.operator = op.textContent;
    });
});

function equals() {
    
}