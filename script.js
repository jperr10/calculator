const display = document.querySelector('#display');
display.textContent = '0';
const buttons = document.querySelectorAll('button');
const digits = document.querySelectorAll('.digit');
digits.forEach((digit) => {
    digit.addEventListener('click', () => {
        //if ()
        if (display.textContent === '0') {
            display.textContent = '';
            //operator no longer selected;
        } else (operations.forEach((operation) => {
            if (operation.classList.length > 1) {
                display.textContent = '';
                unselectButtons(buttons);
            };
        }));
    
        display.textContent += digit.textContent;
    });
});


let num1;// Populated by number entered
let num2 = '';// Populated by number entered
let operator = '';
let result;
const operations = document.querySelectorAll('.operator');

operations.forEach((operation) => {
    operation.addEventListener('click', () => {
        unselectButtons(buttons);
        operator = operation.id;
        operation.classList.toggle('selected');
        num1 = display.textContent;
    });
});

function unselectButtons(buttons) {
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
    } else if (num2 === '') {
        num2 = display.textContent;
    } else {
       
        num2 = display.textContent;
    };
    display.textContent = operate(operator, num1, num2);
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
    return a / b;
};


function clearCalc() {
    //Erase all data (e.g created elements)
    unselectButtons(buttons);
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