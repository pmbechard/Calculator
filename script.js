/*
iOS Calculator Replica

by Peyton Bechard

Created: 5 Apr 2022
Last Updated: 6 Apr 2022
*/



/* CALCULATOR OBJECT */
const calculator =  {
    result: NaN,
    input: '0',
    operator: null,
}

/* OUTPUT */
const output = document.getElementById('input');
function updateOutputResult() {
    if (calculator.result === NaN || calculator.result === Infinity || calculator.result === -Infinity) {
        output.textContent = 'Error';
    } else {
        output.textContent = calculator.result.toLocaleString('en-US');
    }
    calculator.input = '';
    calculator.operator = null;
}

/* NUMBER BUTTONS */
const numberButtons = document.querySelectorAll('.number-button');
numberButtons.forEach( (number) => {
    number.addEventListener('click', () => {
        if (number.textContent === '.') {
            if (!calculator.input.includes('.') && calculator.input) {
                calculator.input += number.textContent;
            } else if (!calculator.input.includes('.') && !calculator.input) {
                calculator.input += '0' + number.textContent;
            }
        } else if (output.textContent === '0' || !calculator.input) {
            calculator.input = number.textContent;
            if (!calculator.operator || calculator.operator === '=') {
                calculator.result = calculator.input;
                calculator.operator = null;
            }
        } else {
            calculator.input += number.textContent;
        }
        output.textContent = Number.parseFloat(calculator.input).toLocaleString('en-US');
    });
});

/* OPERATOR BUTTONS */
const operatorButtons = document.querySelectorAll('.operator-button');
operatorButtons.forEach( (op) => {
    op.addEventListener('click', () => {
        equals();
        calculator.operator = op.value;
        op.classList.add('operator-button-on');
    });
});

const equalsButton = document.getElementById('equals-button');
equalsButton.addEventListener('click', () => equals());
function equals() {
    if (calculator.operator) {
        calculator.result = calculate();
        updateOutputResult();
        calculator.operator = null;
        operatorButtons.forEach( (op) => op.classList.remove('operator-button-on') );
    } else {
        calculator.result = calculator.input;
        calculator.input = '' ;
    }
    calculator.operator = '=';
}

/* OPERATOR CALCULATIONS */
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

/* OPTIONS BUTTONS */
const percentButton = document.getElementById('percent-button');
percentButton.addEventListener('click', () => {
    calculator.result = Number.parseFloat(output.textContent.replace(',', '')) / 100;
    updateOutputResult();
});