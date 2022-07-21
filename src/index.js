const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const clear = document.querySelector('.clear');
const equal = document.querySelector('.equal');
const action = document.querySelector('.action');
const lastaction = document.querySelector('.lastaction');
const minus = document.querySelector('.minus');
const point = document.querySelector('.point');
const brace = document.querySelector('.brace');
let lastresult = '';
let actualresult = '';
let operation;
const symbols = ['×', '÷', '+', 'xy', '-', '('];
let pointerlast = 0;
let multilast = 0;
let divisionlast = 0;
let additionlast = 0;
let power = 0;
let substractionlast = 0;
let bracefirst = 0;
let bracelast = 0;
const solve = () => {
  actualresult = actualresult.replaceAll('÷', '/');
  actualresult = actualresult.replaceAll('×', '*');
  actualresult = actualresult.replaceAll('^', '**');
  actualresult = eval(actualresult);
};
const chooseOperation = (operator) => {
  if (actualresult != '' || operator == '-' || operator == '(') {
    operation = operator;
    actualresult += operator;
  }
  if (actualresult === '') {

  }
};
const updateResult = () => {
  if (action) {
    action.innerText = actualresult;
  }
  pointerlast = actualresult.lastIndexOf('.');
  multilast = actualresult.lastIndexOf('×');
  divisionlast = actualresult.lastIndexOf('÷');
  additionlast = actualresult.lastIndexOf('+');
  power = actualresult.lastIndexOf('^');
  substractionlast = actualresult.lastIndexOf('-');
  bracefirst = actualresult.lastIndexOf('(');
  bracelast = actualresult.lastIndexOf(')');
};
const addNumber = (numbers) => {
  actualresult = actualresult.toString() + numbers.toString();
};
numbers.forEach((number) => {
  number.addEventListener('click', () => {
    addNumber(number.innerText);
    updateResult();
  });
});
operators.forEach((operator) => {
  operator.addEventListener('click', () => {
    const last = actualresult[actualresult.length - 1];
    const multiplesymbols = symbols.some((somesymbols) => somesymbols === last);
    if (multiplesymbols) {
      return;
    }
    if ((last === '-') || (last === '^') || (last === '.')) {
      return;
    }
    chooseOperation(operator.innerText);
    updateResult();
  });
});
minus === null || minus === void 0 ? void 0 : minus.addEventListener('click', () => {
  const last = actualresult[actualresult.length - 1];
  if ((last === '-') || (last === '.')) {
    return;
  }
  actualresult += '-';
  updateResult();
});
brace === null || brace === void 0 ? void 0 : brace.addEventListener('click', () => {
  actualresult += '(';
  updateResult();
});
point === null || point === void 0 ? void 0 : point.addEventListener('click', () => {
  const last = actualresult[actualresult.length - 1];
  if (last === '.') {
    return;
  }
  if ((pointerlast > multilast)
        && (pointerlast > divisionlast)
        && (pointerlast > additionlast)
        && (pointerlast > power)
        && (pointerlast > substractionlast)
        && (pointerlast > bracefirst)
        && (pointerlast > bracelast)) {
    return;
  }
  actualresult += '.';
  updateResult();
});
const deleteNumber = () => {
  actualresult = String(actualresult);
  actualresult = actualresult.slice(0, -1);
};
clear === null || clear === void 0 ? void 0 : clear.addEventListener('click', () => {
  deleteNumber();
  updateResult();
});
equal === null || equal === void 0 ? void 0 : equal.addEventListener('click', () => {
  lastresult = `${actualresult}=`;
  if (lastaction !== null) {
    lastaction.innerText = lastresult;
  }
  solve();
  updateResult();
});
