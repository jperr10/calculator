function add(a, b) {
    return a + b;
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

let num1 = 10;// Populated by number entered
let operator = 'division';// Populated by operator pressed
let num2 = 12;// Populated by number entered

function operate(operator, num1, num2) {
    // num1 is value on display before entering operator (What is entered or previous result)
    // num2 is value on display (Either clicked/typed)
    // operator is basic math operator (Either clicked/typed)
    
    switch (operator) {
     case 'addition':
          result = add(num1, num2);
          break;
      case 'subtraction':
          result = subtract(num1, num2);
          break;
     case 'multiplication':
         result = multiply(num1, num2);
         break;
      case 'division':
          result = divide(num1, num2)
        };
    return result;
};

function divisionClicked() {
    operator = 'division';
};

function multiplicationClicked() {
    operator = 'multiplication';
};

function subtractionClicked() {
    operator = 'subtraction';
};

function additionClicked() {
    operator = 'addition';
};
function equalsClicked() {
    display = operate(operator, num1, num2);
    //Should this return anything?
}