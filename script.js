// MATH FUNCTIONS
function add(n1, n2) {
    return n1 + n2;
}

function subtract(n1, n2) {
    return n1 - n2;
}

function multiply(n1, n2) {
    return n1 * n2;
}

function divide(n1, n2) {
    return n1 / n2;
}


// OPERATION
function operate(n1, operator, n2) {
    switch(operator) {
        case '+':
            return add(n1, n2);
            break;
        case '-':
            return subtract(n1, n2);
            break;
        case 'x':
            return multiply(n1, n2);
            break;
        case '/':
            return divide(n1, n2);
    }
}


// NUMBER & OPERATOR BUTTONS
const display = document.querySelector('.display');

const numberBtn = document.querySelectorAll('.num');
numberBtn.forEach( btn => btn.addEventListener('click', displayValue));
const operatorBtn = document.querySelectorAll('.op');
operatorBtn.forEach( btn => btn.addEventListener('click', displayValue));
const pointBtn = document.querySelector('.point');
pointBtn.addEventListener('click', displayValue);
const signBtn = document.querySelector('.sign');
signBtn.addEventListener('click', displayValue);

const numbers = ['0', '1' , '2', '3', '4', '5', '6', '7', '8', '9'];
const ops = ['+', '-', 'x', '/'];

let currentValues;

function displayValue(e) { 
    // actions if equal was just clicked
    if (equalClicked === true 
    && (numbers.includes(e.target.textContent)
    || e.target.textContent === '+/-'
    || e.target.textContent === '.')) {
        display.textContent = '';
        equalClicked = false;
    } else if (equalClicked === true && ops.includes(e.target.textContent)) {
        equalClicked = false;
    };

    // actions if user inputs expression greater than 2 terms
    if ( (display.textContent.indexOf(' + ') > -1
    || display.textContent.indexOf(' - ') > -1
    || display.textContent.indexOf(' x ') > -1
    || display.textContent.indexOf(' / ') > -1)
        && ops.includes(e.target.textContent)) {
        evaluateExpression();
    };

    // Actions if display shows "invalid expression"
    if (display.textContent === 'invalid expression'
    && ops.includes(e.target.textContent)) {
        return;
    } else if (display.textContent === 'invalid expression') {
        clearData();
    };

    // Stop displaying values if user inputs large number
    let arr = display.textContent.split(' ');
    if (arr[arr.length - 1].length >= 10
    && !ops.includes(e.target.textContent)) {
        return;
    };

    // actions to display operator, point, sign, and numbers
    if (ops.includes(e.target.textContent)) {
        displayOp(e);
    } else if (e.target.textContent === '.') {
        displayPoint(e);
    } else if (e.target.textContent === '+/-') {
        displaySign(e);
    } else {
        displayNumber(e);
    };
    display.textContent = currentValues; 
};

function displayOp(e) {
    currentValues = display.textContent;
    currentValues += ' ' + e.target.textContent + ' ';
};

function displayPoint(e) {
    currentValues = display.textContent;

    // Display point with leading 0
    if (currentValues.charAt(currentValues.length - 1) === '' 
    || currentValues.charAt(currentValues.length - 1) === ' ') {
        currentValues += '0.';
        return;
    };
    
    // Display point without leading 0 and extra points
    let arr = currentValues.split(" ");
    if (arr[arr.length - 1].includes('.') === false) {
        currentValues += e.target.textContent;
    };
};

function displaySign(e) {
    currentValues = display.textContent;
    let arr = currentValues.split(' ');
    if (arr[arr.length - 1].includes('-')) {
        arr[arr.length - 1] = arr[arr.length - 1].slice(1);
    } else {
        arr[arr.length - 1] = '-' + arr[arr.length - 1].slice(0);
    }
    currentValues = arr.join(' ');
};

function displayNumber(e) {
    currentValues = display.textContent;
    currentValues += e.target.textContent;
};



// CLEAR & BACK BUTTON
const clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', clearData);
function clearData() {
    display.textContent = '';
    currentValues = '';
    x = undefined;
    op = undefined;
    y = undefined;
    equalClicked = false;
}

const backBtn = document.querySelector('.back');
backBtn.addEventListener('click', deleteOne);
function deleteOne() {
    let str = display.textContent;

    let editedStr;
    if (str.slice(-1) === ' ') {
        editedStr = str.substring(0, str.length - 3);
    } else {
        editedStr = str.substring(0, str.length - 1);
    };
    display.textContent = editedStr;
};


// EQUAL BUTTON
const equalBtn = document.querySelector('.equal');
equalBtn.addEventListener('click', evaluateExpression);
equalBtn.addEventListener('click', toggleEqualClicked);

let x;
let op;
let y;
let equalClicked = false;

function getExpressionParts() {
    let expressionArr = display.textContent.split(' ');

    x = expressionArr[0];
    op = expressionArr[1];
    y = expressionArr[2];
};

function displayAnswer(text) {
    display.textContent = '';
    display.textContent = `${text}`;
}

function toggleEqualClicked() {
    equalClicked = true;
}

function evaluateExpression() {
    getExpressionParts();

    let answer;
    if (x === '' || op === '' || y === ''
       || x === undefined || op === undefined || y === undefined) {
        answer = 'invalid expression';
    } else {
        answer = operate(+x, op, +y);
        if (answer.toString().length > 10) {
            answer = Math.round(answer * 10000000000) / 10000000000;
        };
    }
    
    displayAnswer(answer);
}


// SOUNDS
numberBtn.forEach( btn => btn.addEventListener('click', playNumSound));
const numSound = document.getElementById("num-sound");
function playNumSound() {
    numSound.currentTime = 0;
    numSound.play();
};

operatorBtn.forEach( btn => btn.addEventListener('click', playOpSound));
pointBtn.addEventListener('click', playOpSound);
signBtn.addEventListener('click', playOpSound);
backBtn.addEventListener('click', playOpSound);
clearBtn.addEventListener('click', playOpSound);
equalBtn.addEventListener('click', playOpSound);
const opSound = document.getElementById("op-sound");
function playOpSound() {
    opSound.currentTime = 0;
    opSound.play();
};

