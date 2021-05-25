class Calculator {
  constructor(oldNumber, currentNumber) {
    this.oldNumber = oldNumber
    this.currentNumber = currentNumber
    this.clear()
  }

  clear() {
    this.newNumber = ''
    this.oldNumbers = ''
    this.operation = undefined
  }

  delete() {
    this.newNumber = this.newNumber.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.newNumber.includes('.')) return
    this.newNumber = this.newNumber.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.newNumber === '') return
    if (this.oldNumbers !== '') {
      this.compute()
    }
    this.operation = operation
    this.oldNumbers = this.newNumber
    this.newNumber = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.oldNumbers)
    const current = parseFloat(this.newNumber)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.newNumber = computation
    this.operation = undefined
    this.oldNumbers = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentNumber.innerText =
      this.getDisplayNumber(this.newNumber)
    if (this.operation != null) {
      this.oldNumber.innerText =
        `${this.getDisplayNumber(this.oldNumbers)} ${this.operation}`
    } else {
      this.oldNumber.innerText = ''
    }
  }
}


const pressNumber = document.querySelectorAll('[data-number]')
const calculateButton = document.querySelectorAll('[data-calculate]')
const isEqualTo = document.querySelector('[data-equals]')
const deleteNumber = document.querySelector('[data-delete]')
const clearBoard = document.querySelector('[data-clear]')
const oldNumber = document.querySelector('[data-oldNumber]')
const currentNumber = document.querySelector('[data-currentNumber]')

const calculator = new Calculator(oldNumber, currentNumber)

pressNumber.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

calculateButton.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

isEqualTo.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

clearBoard.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteNumber.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})