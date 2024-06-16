const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operator]');

const equalsButton = document.querySelector('[data-equals');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

class Calculator {

    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    calculate(){
        let result;
        const _previousOperand = parseFloat(this.previousOperand);
        const _currentOperand = parseFloat(this.currentOperand);

        if(isNaN(_previousOperand) || isNaN(_currentOperand)) return;

        switch(this.operation){
            case "+":
                result = _previousOperand + _currentOperand;
                break;
            case "-":
                result = _previousOperand - _currentOperand;
                break;
            case "*":
                result = _previousOperand * _currentOperand;
                break;
            case "/":
                result = _previousOperand / _currentOperand;
                break;
            default:
                return;
        }
    }

    chooseOperation(operation){
        if(this.previousOperand ==! ""){
            this.calculate();
        }

        this.operation = operation;

        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    appendNumber(number) {
        if( this.currentOperand.includes(".") && number === ".") return // verifica se existe o ponto .

        this.currentOperand = ` ${ this.currentOperand} ${ number.toString() }`;
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    updateDisplay(){
        this.previousOperandTextElement.innerText = `${this.currentOperand} ${this.operation || ''}`;
        this.currentOperandTextElement.innerText = this.currentOperand;
    }
}

const calculator = new Calculator(
    previousOperandTextElement,
    currentOperandTextElement
);

for (const numberButton of numberButtons ){
    numberButton.addEventListener("click", () => {
        calculator.appendNumber(numberButton.innerText);
        calculator.updateDisplay();
    })
}

for (const operationButton of operationButtons){
    operationButton.addEventListener("click", () => {
        calculator.chooseOperation(operationButton.innerText);
        calculator.updateDisplay();
    })
}

allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
});