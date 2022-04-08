/*
iOS Calculator Replica


by Peyton Bechard


Created: 5 Apr 2022
Last Updated: 8 Apr 2022


TO DO:
    - ADD OPERATOR FUNCTIONALITY
    - ADD FUNCTIONALITY TO CHANGED BETWEEN AC/C FOR CLEAR BUTTON
    - ADD NUMBER LENGTH LIMIT / TEXT SHOULD SHRINK AS NUMBER LENGTH INCREASES


KNOWN BUGS:
    

*/

let currentInput = '0';
let storedValue = null;
let currentOperator = null;
const displayedValue = document.getElementById('input');

/*         NUMBER BUTTONS       */
const numberButtons = document.querySelectorAll('.number-button');
numberButtons.forEach( (button) => {
    button.addEventListener('click', (e) => {
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
    } else {
        currentInput += value;
    }
    updateDisplay();
}

function updateDisplay() {
    if (currentInput >= 1000 || Number.parseFloat(currentInput) <= -1000) {
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
// for each operator:
    // calculate the operation between stored value and input (based on previous operator)
    // activate the current operator
    // move input to stored value
    // set input to '0'

// determine operator function and return appropriate values

const operatorButtons = document.querySelectorAll('.operator-button');
operatorButtons.forEach( (button) => {
    button.addEventListener('click', () => {
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
    let temp = currentInput;
    currentInput = doCalculation();
    updateDisplay();
    setStoredValue();
    currentInput = temp;
});

function doCalculation() {
    let stored = Number.parseFloat(storedValue);
    let current = Number.parseFloat(currentInput);
    let result;
    switch (currentOperator) {
        case '+':
            result = stored + current;
            break;
        case '-':
            result = stored - current;
            break;
        case 'x':
            result = stored * current;
            break;
        case '/':
            result = stored / current;
            break;
    }
    return result.toPrecision().toString();
}

function setStoredValue() {
    storedValue = currentInput;
    currentInput = '0';
}



/*      OPTIONS BUTTONS         */
const acButton = document.getElementById('clear-button');
acButton.addEventListener('click', () => {
    currentInput = '0';
    addToInput('0');
    storedValue = null;
})

const plusMinusButton = document.getElementById('plus-minus-button');
plusMinusButton.addEventListener('click', () => {
    addToInput('+-');
});

const percentButton = document.getElementById('percent-button');
percentButton.addEventListener('click', () => {
    addToInput('%');
})