const calculator =  {
    result: NaN,
    input: '0',
    operator: null,
}

const output = document.getElementById('input');
function updateOutputResult() {
    if (calculator.result === NaN) {
        output.textContent = 'Error';
    } else {
        output.textContent = calculator.result;
    }
    calculator.input = '';
}

/* Number Buttons */
const numberButtons = document.querySelectorAll('.number-button');
numberButtons.forEach( (number) => {
    number.addEventListener('click', () => {
        if (number.textContent === '.') {
            if (!calculator.input.includes('.') && calculator.input) {
                calculator.input += number.textContent;
            } else if (!calculator.input.includes('.') && !calculator.input) {
                calculator.input += '0' + number.textContent;
            }
        } else if (output.textContent === '0' && number.textContent !== '.') {
            calculator.input = number.textContent;
        } else {
            calculator.input += number.textContent;
        }
        output.textContent = calculator.input;
    });
});

function calculate() {
    let currentInput = Number.parseFloat(calculator.input);
    let currentResult = Number.parseFloat(calculator.result);
    switch (calculator.operator) {
        case '+':
            return currentResult + currentInput;
        case '-':
            return currentResult - currentInput;
        case 'x':
            return currentResult * currentInput;
        case '/':
            return currentResult / currentInput;
        default:
            return currentResult;
    }
}

const operatorButtons = document.querySelectorAll('.operator-button');
operatorButtons.forEach( (op) => {
    op.addEventListener('click', () => {
        equals();
        calculator.operator = op.value;
    });
});

const equalsButton = document.getElementById('equals-button');
equalsButton.addEventListener('click', () => {
    equals();
    calculator.operator = '=';
});

function equals() {
    if (calculator.operator) {
        calculator.result = calculate();
        updateOutputResult();
        calculator.operator = null;
    } else {
        calculator.result = calculator.input;
        calculator.input = '' ;
    }
}

