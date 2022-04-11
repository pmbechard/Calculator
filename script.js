/*
iOS Calculator Replica


by Peyton Bechard


Created: 5 Apr 2022
Last Updated: 9 Apr 2022


TO DO:

KNOWN BUGS:
    1. RESULTS FONT TOO LARGE IN MOBILE VIEW (MIGHT CONSIDER USING window.innerWidth FOR RESPONSIVENESS IN sizeOutput())
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
        let limiter = displayedValue.textContent.replace(',', '').replace(',', '').replace('.','').length
        if (limiter < 9) {
            currentInput += value;
        }
    }
    updateDisplay();
}

function updateDisplay() {
    if (currentInput.includes('e')) {
        displayedValue.textContent = currentInput;
    } else if (currentInput === 'NaN' || currentInput.includes('Infinity')) {
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

    if (displayedValue.textContent > 999999999) {
        displayedValue.textContent = Number.parseFloat(displayedValue.textContent).toExponential();
    }

    if (displayedValue.textContent.replace(',', '').replace(',', '').replace('.','').length > 9 && !displayedValue.textContent.includes('e')) {
        let beforeDecimal = displayedValue.textContent.split('.')[0].length;
        let afterDecimal = displayedValue.textContent.split('.')[1].length;
        let roundedShortenedValue = Number.parseFloat(displayedValue.textContent).toFixed(9 - beforeDecimal >= 0 ? 9 - beforeDecimal : 0);
        displayedValue.textContent = roundedShortenedValue;

        // BUG 2
    } else if (displayedValue.textContent.replace(',', '').replace(',', '').replace('.','').length > 9 && displayedValue.textContent.includes('e')) {
        let beforeDecimal = displayedValue.textContent.split('.')[0].length;
        let afterDecimal = displayedValue.textContent.split('.')[1].split('e')[0].length;
        let roundedShortenedValue = Number.parseFloat(displayedValue.textContent.split('e')[0]).toFixed(9 - beforeDecimal >= 0 ? 6 - beforeDecimal : 0) + 'e' + displayedValue.textContent.split('e')[1];
        displayedValue.textContent = roundedShortenedValue;
    }
    sizeOutput();
}

function sizeOutput() {
    let length = displayedValue.textContent.replace(',', '').replace(',', '').replace('.','').length;
    switch (length) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
            displayedValue.style.fontSize = '100%';
            break;
        case 7:
            displayedValue.style.fontSize = '90%';
            break;
        case 8:
            displayedValue.style.fontSize = '80%';
            break;
        default:
            displayedValue.style.fontSize = '70%';
            break;
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
            result = Number.parseFloat((stored * current).toPrecision());
            break;
        case '/':
            result = Number.parseFloat((stored / current).toPrecision());
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