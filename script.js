const display = document.querySelector('#display');
display.textContent = '0';
const buttons = document.querySelectorAll('button');
const digits = document.querySelectorAll('.digit');
let num1;// Populated by number entered
let num2 = '';// Populated by number entered
let operator = '';
let result;
const operations = document.querySelectorAll('.operator');
const equals = document.querySelector('#equals');
const decimalPoint = document.querySelector('#decimal');
const clear = document.querySelector('#clear');

digits.forEach((digit) => {
    digit.addEventListener('click', enterDigit);
});

window.addEventListener('keydown', (function(e) {
    if ((e.key * 0) !== 0) return;
    const digit = e.key;
    enterDigit(digit);
}));

function enterDigit(digit) {
    if (digit.type === 'click') {
        digit = digit.srcElement.textContent;
    };
    if (equals.classList.length > 1) {
        operator = '';
    };
    if (display.textContent === '0') {
        display.textContent = '';
    } else (buttons.forEach((button) => {
        if (button.classList.length > 1) {
            display.textContent = '';
        };
    }));
    if (checkNumTooLong(display.textContent)) { 
        display.textContent += digit;
    };
    unselectButtons(buttons);
};

operations.forEach((operation) => {
    operation.addEventListener('click', enterOperation); 
});

window.addEventListener('keydown', (function(e) {
    if (e.key !== '/' && e.key !== '*' && e.key !== '-' && e.key !== '+') return;
    enterOperation(e);
}));

function enterOperation(operation) {  
    if (operator !== '' && equals.classList.length < 2 && display.classList.length < 1) {
        num2 = display.textContent;
        const result = operate(operator, num1, num2);
        console.log(`${num1} ${operator} ${num2} = ${result}`);
        display.textContent = roundResult(result) * 1;
    };
    if (decimalPoint.classList.length > 0) {
        decimalPoint.classList.toggle('used');
    };
    unselectButtons(buttons);
    if (operation.type === 'click') {
        operator = operation.target.id;
        operation.target.classList.toggle('selected');
    } else if (operation.type === 'keydown') {
        assignOperator(operation);
    };
    display.classList.toggle('operation-selected');
    num1 = display.textContent;
};

function assignOperator(operation) {
    if (operation.key === '/') {
        operator = 'division';
        operations[0].classList.toggle('selected');
    } else if (operation.key === '*') {
        operator = 'multiplication';
        operations[1].classList.toggle('selected');
    } else if (operation.key === '-') {
        operator = 'subtraction';
        operations[2].classList.toggle('selected');
    } else if (operation.key === '+') {
        operator = 'addition';
        operations[3].classList.toggle('selected');
    };
};


function unselectButtons(buttons) {
    if (display.classList.length > 0) {
        display.classList.toggle('operation-selected');
    };
    if (decimalPoint.classList.length > 0) {
        decimalPoint.classList.toggle('used');
    };
    buttons.forEach((button) => {
        if (button.classList.length > 1) {
            button.classList.toggle('selected');
        };
    });
};


equals.addEventListener('click', () => {
    
    if (equals.classList.length > 1) {
        equals.classList.toggle('selected');
        num1 = display.textContent;  
    } else if (operator === '') {
        // n = n+0
        operator = 'addition'
        num1 = display.textContent;
        num2 = 0;
    } else if (num2 === '') {
        num2 = display.textContent;
    } else {
        num2 = display.textContent;
    };
    const result = operate(operator, num1, num2);
    console.log(`${num1} ${operator} ${num2} = ${result}`);
    display.textContent = roundResult(result) * 1;
    equals.classList.toggle('selected');
})

// Enter = if typed on keyboard
window.addEventListener('keydown', function(e) {
    if (e.key !== '=' && e.key !== 'Enter') return;

console.log(e.key);
e.preventDefault();

    if (equals.classList.length > 1) {
        equals.classList.toggle('selected');
        num1 = display.textContent;  
    } else if (operator === '') {
        console.log(operator);
        // n = n+0
        operator = 'addition'
        num1 = display.textContent;
        num2 = 0;
    } else if (num2 === '') {
        num2 = display.textContent;
    } else {
        num2 = display.textContent;
    };
    const result = operate(operator, num1, num2);
    console.log(`${num1} ${operator} ${num2} = ${result}`);
    display.textContent = roundResult(result) * 1;
    console.log(display.textContent);
    equals.classList.toggle('selected');
});

function operate(operator, num1, num2) {
    console.log(`${num1} ${operator} ${num2}  `)
    switch (operator) {
     case 'addition':
          return add(num1, num2);
      case 'subtraction':
          return subtract(num1, num2);
     case 'multiplication':
         return multiply(num1, num2);
      case 'division':
          return divide(num1, num2)
        };
};

function checkNumTooLong(display) {
    return display.length < 9
};

function roundResult(result) {
    // There should be max 9 significant figures
    if (result.toString().length > 9) {
      result = result.toPrecision(9);
    };
    return result;
};


decimalPoint.addEventListener('click', typeDecimal);
window.addEventListener('keydown', function(e) {
    if (e.key !== '.') return;

    console.log(e.key);

    typeDecimal();
});

function typeDecimal() {
    buttons.forEach((button) => {
        //check if any operators or = is selected
        if (button.classList.length > 1) {
            console.log(display.textContent);
            display.textContent = '0';
            unselectButtons(buttons);
        };
    });
    if (decimalPoint.classList.length < 1) {
        display.textContent += decimalPoint.textContent;
        decimalPoint.classList.toggle('used');
    };
};


clear.addEventListener('click', clearCalc);


function add(a, b) {
    return Number(a) + Number(b);
};

function subtract(a, b) {
    return a-b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    if (b === '0') {
        return "Error: Can't divide by 0";
    } else {
        return a / b;
    };
};


function clearCalc() {
    //Erase all data
    
    unselectButtons(buttons);
    if (decimalPoint.classList.length > 0) {
        decimalPoint.classList.toggle('used');
    };
    display.textContent = '0';
    num1 = '';
    num2 = '';
    operator = ''
    //clear.classList.toggle('selected');
};

function changeDisplaySign() {
    display.textContent *= -1;
};

function makeDisplayPercentage() {
    display.textContent *= .01;
};

