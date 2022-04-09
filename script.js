/*
iOS Calculator Replica


by Peyton Bechard


Created: 5 Apr 2022
Last Updated: 9 Apr 2022


TO DO:
    - ADD NUMBER LENGTH LIMIT / TEXT SHOULD SHRINK AS NUMBER LENGTH INCREASES


KNOWN BUGS:

*/

let currentInput = '0';
let storedValue = null;
let currentOperator = '';
const displayedValue = document.getElementById('input');

/*         NUMBER BUTTONS       */
const numberButtons = document.querySelectorAll('.number-button');
numberButtons.forEach( (button) => {
    button.addEventListener('click', (e) => {
        operatorButtons.forEach( (button) => button.classList.remove('operator-button-on'));
        addToInput(button.textContent);
    });
});

/*      INPUT AND DISPLAY       */
function addToInput(value) {
    if (value === '+-') {
        currentInput *= -1;
        currentInput = currentInput.toPrecision();
        currentInput = currentInput.toString();
    } else if (value === '%') {
        currentInput /= 100;
        currentInput = currentInput.toString();
    } else if (value === '.') {
        if (!currentInput.includes('.')) {
            currentInput += value;
        }
    } else if (currentInput === '0' || !currentInput) {
        currentInput = value;
    } else if (currentOperator === null) {
        currentInput = value;
        currentOperator = '';
    } else {
        currentInput += value;
    }
    updateDisplay();
}

function updateDisplay() {
    if (currentInput.includes('e')) {
        console.log('includes e', currentInput);
        displayedValue.textContent = currentInput;
    }
    if (currentInput === 'NaN' || currentInput.includes('Infinity')) {
        displayedValue.textContent = 'Error';
    } else if (currentInput >= 1000 || Number.parseFloat(currentInput) <= -1000) {
    if (!currentInput.includes('.')) {
        displayedValue.textContent = Number.parseInt(currentInput).toLocaleString('en-US');
    } else {
        let splitCurrent = currentInput.split('.');
        displayedValue.textContent = Number.parseInt(splitCurrent[0]).toLocaleString('en-US') + '.' + splitCurrent[1];
    }
} else {
    displayedValue.textContent = currentInput;
}
}

/*          OPERATORS           */
const operatorButtons = document.querySelectorAll('.operator-button');
operatorButtons.forEach( (button) => {
    button.addEventListener('click', () => {
        button.classList.add('operator-button-on');
        acButton.textContent = 'C';
        if (currentOperator !== null) {
            currentInput = doCalculation();
            updateDisplay();
        }
        currentOperator = button.value;
        setStoredValue();
    });
});

const equalsButton = document.getElementById('equals-button');
equalsButton.addEventListener('click', () => {
    currentInput = doCalculation();
    updateDisplay();
    currentOperator = null;
});

function doCalculation() {
    let stored = Number.parseFloat(storedValue);
    let current = Number.parseFloat(currentInput);
    let result;
    switch (currentOperator) {
        case '+':
            result = Number.parseFloat((stored + current).toPrecision(storedValue.length > currentInput.length ? storedValue.length : currentInput.length));
            break;
        case '-':
            result = Number.parseFloat((stored - current).toPrecision(storedValue.length > currentInput.length ? storedValue.length : currentInput.length));
            break;
        case 'x':
            result = stored * current;
            break;
        case '/':
            result = stored / current;
            break;
        default:
            result = current;
    }
    operatorButtons.forEach( (button) => button.classList.remove('operator-button-on'));
    result = result.toPrecision().toString();
    if (result > 999_999_999) {
        result = Number.parseFloat(result).toExponential();
    }
    return result
}

function setStoredValue() {
    storedValue = currentInput;
    currentInput = '0';
}



/*      OPTIONS BUTTONS         */
const acButton = document.getElementById('clear-button');
acButton.addEventListener('click', () => {
    if (acButton.textContent === 'AC') {
        storedValue = null;
    }
    currentInput = '0';
    addToInput('0');
    acButton.textContent = 'AC';
    operatorButtons.forEach( (button) => button.classList.remove('operator-button-on'));
});

const plusMinusButton = document.getElementById('plus-minus-button');
plusMinusButton.addEventListener('click', () => {
    addToInput('+-');
});

const percentButton = document.getElementById('percent-button');
percentButton.addEventListener('click', () => {
    addToInput('%');
});