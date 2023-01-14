class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear(); //clears all
    }

    clear(){ // nullifies both opeands and operation
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1); //returns everything except last digit
    }

    appendNUmber(number){
        if(number === '.' && this.currentOperand.includes('.')) //only one period can be added
            return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
                                   
    chooseOperation(operation){
        if(this.currentOperand === '')  
            return
        if(this.previousOperand !== ''){ //allows user to chain functions and it keeps updating answer
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand); //convert String to number
        const current = parseFloat(this.currentOperand); //convert String to number
        if(isNaN(prev) || isNaN(current)) 
            return
        switch(this.operation){ //compute operations
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return
        }
        this.currentOperand = computation;
        this.operation = undefined; 
        this.previousOperand = '';
     }

    getDisplayNumber(number){
        const stringNumber = number.toString(); //cast number to String
        const integerDigits = parseFloat(stringNumber.split('.')[0]); //takes the integer portion
        const decimalDigits = stringNumber.split('.')[1]; //takes the decimal portion
        let integerDisplay;
        if(isNaN(integerDigits)){ //if no number is entered, or just a decimal
            integerDisplay = ''; //no integer is shown
        } else
            integerDisplay = integerDigits.toLocaleString('en', //puts commas after numbers, as needed
            {maximumFractionDigits: 0}) //no decimal places are included after integer

        if(decimalDigits != null){ //decimals are entered after numbers
            return `${integerDisplay}.${decimalDigits}` //show the decimal 
        } else //if no decimal digits
            return integerDisplay; //only return integer
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = 
           this.getDisplayNumber(this.currentOperand); 
        if(this.operation != null){  //if operation exists
            this.previousOperandTextElement.innerText = 
                `${(this.previousOperand)} ${this.operation}` //concatenation of previous operation and operation
        } else{ //if operation does not exist
            this.previousOperandTextElement.innerText =''; //clears previous operand

        }
    }

}

//document.querySelectorAll([‘data attribute’]) - select all elements with the data attribute specified
//document.querySelector([‘data attribute’]) - selects single element with the data attribute specified

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement); //initialize Calculator Oject

numberButtons.forEach(button =>{ //appends numbers per number button click (allows us to type)
    button.addEventListener('click', () =>{
        calculator.appendNUmber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button =>{ //show operation button per operations button click
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button =>{ //compute the equation per equals button click
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button =>{ //clears the console per AC button click
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button =>{ //deletes the digit per delete button click
    calculator.delete();
    calculator.updateDisplay();
})