/*
iOS Calculator Replica


by Peyton Bechard


Created: 5 Apr 2022
Last Updated: 6 Apr 2022



KNOWN BUGS:
    1. CAN'T ADD DECIMALS TO EXISTING WHOLE NUMBERS IF YOU PRESS . FIRST INSTEAD OF 0
    2. PRECISION WITH PERCENTAGES IS OFF
    3. PLUS/MINUS DOESN'T WORK IN CALCULATIONS
    4. NUMBER FORMATTING (COMMAS) DOESN'T WORK WHEN TYPING IN NUMBERS
    5. FOCUS-VISIBLE PSEUDO SELECTOR NEEDS TO BE CLEARED

TO DO:
    - ADD FUNCTIONALITY TO CHANGED BETWEEN AC/C FOR CLEAR BUTTON
    - ADD NUMBER LENGTH LIMIT / TEXT SHOULD SHRINK AS NUMBER LENGTH INCREASES
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
            } else {
                calculator.input += '0' + number.textContent;
                calculator.result = calculator.input;
                calculator.operator = null;
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

        // BUG 1
        if (calculator.input.slice(calculator.input.length - 1) === '.' || calculator.input.slice(calculator.input.length - 1) === '0') {
            output.textContent = calculator.input;
        } else {
            output.textContent = calculator.input.toLocaleString('en-US');
        }
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
        operatorButtons.forEach( (op) => op.classList.remove('operator-button-on') );
    } else {
        calculator.result = calculator.input;
        calculator.input = '' ;
    }
    calculator.operator = '=';
}

/* OPERATOR CALCULATIONS */
function calculate() {
    let currentResult = Number.parseFloat(calculator.result);
    let currentInput = Number.parseFloat(calculator.input);
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
const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', () => {
    calculator.input = '0';
    calculator.result = 0;
    output.textContent = '0';
});

const plusMinusButton = document.getElementById('plus-minus-button');
plusMinusButton.addEventListener('click', () => {
    // BUG 3
    calculator.result = Number.parseFloat(output.textContent.replace(',', '') * -1);
    updateOutputResult();
});

const percentButton = document.getElementById('percent-button');
percentButton.addEventListener('click', () => {
    // BUG 2
    calculator.result = Number.parseFloat(output.textContent.replace(',', '') / 100).toPrecision();
    updateOutputResult();
});