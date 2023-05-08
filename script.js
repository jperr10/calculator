const display = document.querySelector('#display');
display.textContent = '0';
const buttons = document.querySelectorAll('button');
const digits = document.querySelectorAll('.digit');
digits.forEach((digit) => {
    digit.addEventListener('click', () => {
        if (equals.classList.length > 1) {
            operator = '';
        };
        if (display.textContent === '0') {
            display.textContent = '';
            //operator no longer selected;
        } else (buttons.forEach((button) => {
            if (button.classList.length > 1) {
                display.textContent = '';
                unselectButtons(buttons);
            };
        }));
        if (checkNumTooLong(display.textContent)) {  
            display.textContent += digit.textContent;
        };
        
        //digit.classList.toggle('selected');
    });
});


let num1;// Populated by number entered
let num2 = '';// Populated by number entered
let operator = '';
let result;
const operations = document.querySelectorAll('.operator');

operations.forEach((operation) => {
    operation.addEventListener('click', () => {
        if (operator !== '' && equals.classList.length < 2) {
            num2 = display.textContent;
            display.textContent = operate(operator, num1, num2).toFixed(8);
        };
        // 
        if (decimalPoint.classList.length > 0) {
            decimalPoint.classList.toggle('used');
        }
        unselectButtons(buttons);
        operator = operation.id;
        operation.classList.toggle('selected');
        num1 = display.textContent;
    });
});

function unselectButtons(buttons) {
    if (decimalPoint.classList.length > 0) {
        decimalPoint.classList.toggle('used');
    };
    buttons.forEach((button) => {
        if (button.classList.length > 1) {
            button.classList.toggle('selected');
        };
    });
};

const equals = document.querySelector('#equals');
equals.addEventListener('click', () => {
    // toggle selected off for all buttons not just operators
    if (equals.classList.length > 1) {
        equals.classList.toggle('selected');
        num1 = display.textContent;  
    } else if (operator === '') {
        operator = 'addition'
        num1 = display.textContent;
        num2 = 0;
    } else if (num2 === '') {
        num2 = display.textContent;
    } else {
        num2 = display.textContent;
    };
    const result = operate(operator, num1, num2);
    console.log(result);
    display.textContent = roundResult(result);
    equals.classList.toggle('selected');
    //num2 = '';
})


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
    console.log(result.toString().length);
    if (result.toString().length > 9) {
        
      result = result.toPrecision(5);
      
    };
    return result;
};

const decimalPoint = document.querySelector('#decimal');
decimalPoint.addEventListener('click', typeDecimal);

function typeDecimal() {
    buttons.forEach((button) => {
        //check if any operators or = is selected
        if (button.classList.length > 1) {
            display.textContent = '0';
            unselectButtons(buttons);
        };
    });
    if (decimalPoint.classList.length < 1) {
        display.textContent += decimalPoint.textContent;
        decimalPoint.classList.toggle('used');
    };
    
};

const clear = document.querySelector('#clear');
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
};

function changeDisplaySign() {
    display.textContent *= -1;
};

function makeDisplayPercentage() {
    display.textContent *= .01;
};



