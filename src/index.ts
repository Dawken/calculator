import {addNumber} from "./addingNumbers";
import {solve} from "./solvingProblem";
import {deleteNumber} from "./clearResult";
import {chooseOperation} from "./operators";

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
let actualResult:string = ''
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




const updateResult = () => {
  if(action) {
    action.innerText = actualResult
  }
  pointerlast = actualResult.lastIndexOf('.')
  multilast = actualResult.lastIndexOf('×')
  divisionlast = actualResult.lastIndexOf('÷')
  additionlast = actualResult.lastIndexOf('+')
  power = actualResult.lastIndexOf('^')
  substractionlast = actualResult.lastIndexOf('-')
  bracefirst = actualResult.lastIndexOf('(')
  bracelast = actualResult.lastIndexOf(')')
}

numbers.forEach((number):void => {
  number.addEventListener('click', () => {
    actualResult = addNumber(number.innerText, actualResult)
    updateResult()
  })
});


operators.forEach((operator) => {
  operator.addEventListener('click', () => {
    const last = actualResult[actualResult.length - 1]
    const multiplesymbols = symbols.some((somesymbols) => {
      return somesymbols === last
    })
    if (multiplesymbols) {
      return
    }
    if ((last === '-') || (last === '^') || (last === '.')) {
      return
    }

    actualResult = chooseOperation(operator.innerText, actualResult)
    updateResult()
  })
});

minus?.addEventListener('click', ():void => {
  const last = actualResult[actualResult.length - 1]
  if ((last === '-') || (last === '.')){
    return
  }

  actualResult = actualResult + "-"
  updateResult()
})
brace?.addEventListener('click', ():void => {
  actualResult = actualResult + "("
  updateResult()
})

point?.addEventListener('click', ():void => {
  const last = actualResult[actualResult.length - 1]
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

  actualResult = actualResult + "."
  updateResult()
})


clear?.addEventListener('click', ():void => {
  actualResult = deleteNumber(actualResult)
  updateResult()
});

equal?.addEventListener('click', () => {
  lastresult = actualResult + "="
  if(lastaction !== null) {
    lastaction.innerText = lastresult
  }
  actualResult = solve(actualResult)
  updateResult()
});



