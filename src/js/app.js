import "../scss/app.scss";

const display = document.querySelector(".calculator-input");
const keys = document.querySelector(".calculator-keys");

let displayValue = "0";
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;
let isOpened = false;

updateDisplay();

function updateDisplay() {
  if (isOpened) {
    display.value = displayValue;
  } else {
    display.value = "";
  }
}

function handleOperator(nextOperator) {
  const value = parseFloat(displayValue);
  if (firstValue === null) {
    firstValue = value;
  } else if (operator) {
    const result = calculate(firstValue, value, operator);

    //displayValue= String(result);
    displayValue = `${parseFloat(result.toFixed(4))}`;
    firstValue = result;
  }
  waitingForSecondValue = true;
  operator = nextOperator;
}
function calculate(first, second, operator) {
  if (operator === "+") {
    return first + second;
  } else if (operator === "-") {
    return first - second;
  } else if (operator === "*") {
    return first * second;
  } else if (operator === "/") {
    return first / second;
  }
  return second;
}

keys.addEventListener("click", function (e) {
  const element = e.target;
  if (!element.matches("button")) return;

  if (element.classList.contains("operator-on")) {
    isOpened = !isOpened;
    if (!isOpened) {
      clear();
    }
    updateDisplay();
    console.log("operator", element.value);
    return;
  }

  if (!isOpened) return;

  if (element.classList.contains("operator")) {
    handleOperator(element.value);
    updateDisplay();
    console.log("operator", element.value);
    return;
  }
  if (element.classList.contains("decimal")) {
    console.log("decimal", element.value);
    inputDecimal(element.value);
    updateDisplay();
    return;
  }
  if (element.classList.contains("clear")) {
    clear();
    updateDisplay();
    console.log("clear", element.value);
    return;
  }

  console.log("number", element.value);
  inputNumber(element.value);
  updateDisplay();
});
function inputNumber(num) {
  if (waitingForSecondValue) {
    displayValue = num;
    waitingForSecondValue = false;
  } else {
    displayValue = displayValue === "0" ? num : displayValue + num;
  }
}
function inputDecimal() {
  if (!displayValue.includes(".")) {
    displayValue += ".";
  }
}
function clear() {
  displayValue = "0";
  firstValue = null;
  operator = null;
  waitingForSecondValue = false;
}
