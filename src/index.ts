const numbers = document.querySelectorAll<HTMLButtonElement>(".number")
const operators = document.querySelectorAll<HTMLButtonElement>(".operator")
const clear = document.querySelector(".clear")
const equal = document.querySelector(".equal")
const action = document.querySelector<HTMLDivElement>(".action")
const lastaction = document.querySelector<HTMLDivElement>(".lastaction")
const minus = document.querySelector(".minus")
const point = document.querySelector(".point")
const brace = document.querySelector(".brace")

let lastresult:string = ''
let actualresult:string = ''
let operation = undefined
let symbols = ['×', '÷', '+', 'xy', '-', '(']
let pointerlast:number = 0
let multilast:number = 0
let divisionlast:number = 0
let additionlast:number = 0
let power:number = 0
let substractionlast:number = 0
let bracefirst:number = 0
let bracelast:number = 0

const solve = ():void => {

  actualresult = actualresult.replaceAll("÷", "/")
  actualresult = actualresult.replaceAll("×", "*")
  actualresult = actualresult.replaceAll("^", "**")

  actualresult = eval(actualresult);
}

const chooseOperation = (operator:string):void => {

  if (actualresult != '' || operator == '-' || operator == '(') {
    operation = operator
    actualresult = actualresult + operator
  }
  if (actualresult === '') {
    return
  }
}

const updateResult = ():void => {
  if(action) {
    action.innerText = actualresult
  }
  pointerlast = actualresult.lastIndexOf('.')
  multilast = actualresult.lastIndexOf('×')
  divisionlast = actualresult.lastIndexOf('÷')
  additionlast = actualresult.lastIndexOf('+')
  power = actualresult.lastIndexOf('^')
  substractionlast = actualresult.lastIndexOf('-')
  bracefirst = actualresult.lastIndexOf('(')
  bracelast = actualresult.lastIndexOf(')')
}

const addNumber = (numbers: { toString: () => string }):void => {
  actualresult = actualresult.toString() + numbers.toString()
}

numbers.forEach((number):void => {
  number.addEventListener('click', () => {
    addNumber(number.innerText)
    updateResult()
  })
});


operators.forEach((operator):void => {
  operator.addEventListener('click', () => {
    const last = actualresult[actualresult.length - 1]
    const multiplesymbols = symbols.some((somesymbols) => {
      return somesymbols === last
    })
    if (multiplesymbols) {
      return
    }
    if ((last === '-') || (last === '^') || (last === '.')) {
      return
    }

    chooseOperation(operator.innerText)
    updateResult()
  })
});

minus?.addEventListener('click', ():void => {
  const last = actualresult[actualresult.length - 1]
  if ((last === '-') || (last === '.')){
    return
  }

  actualresult = actualresult + "-"
  updateResult()
})
brace?.addEventListener('click', ():void => {
  actualresult = actualresult + "("
  updateResult()
})

point?.addEventListener('click', ():void => {
  const last = actualresult[actualresult.length - 1]
  if (last === '.') {
    return
  }
  if((pointerlast > multilast)
      && (pointerlast > divisionlast)
      && (pointerlast > additionlast)
      && (pointerlast > power)
      && (pointerlast > substractionlast)
      && (pointerlast > bracefirst)
      && (pointerlast > bracelast)){
    return
  }

  actualresult = actualresult + "."
  updateResult()
})


const deleteNumber = ():void => {
  actualresult = String(actualresult);
  actualresult = actualresult.slice(0, -1)
}

clear?.addEventListener('click', ():void => {
  deleteNumber()
  updateResult()
});

equal?.addEventListener('click', ():void => {
  lastresult = actualresult + "="
  if(lastaction !== null) {
    lastaction.innerText = lastresult
  }
  solve()
  updateResult()
});



