import {addNumber} from "./addingNumbers"
import {deleteNumber} from "./clearResult"
import {solve} from "./solvingProblem"
import {chooseOperation} from "./operators";


let lastResult = ''
export let actualResult = ''
let pointerlast = 0
let multilast = 0
let divisionlast = 0
let additionlast = 0
let power = 0
let substractionlast = 0
let bracefirst = 0
let bracelast = 0
let symbols = ['×', '÷', '+', 'xy', '-', '(']

const equal = document.querySelector(".equal")
const lastAction = document.querySelector(".lastaction")
const numbers = document.querySelectorAll(".number")
const clear = document.querySelector(".clear")
const operators = document.querySelectorAll(".operator")
const action = document.querySelector(".action")
const minus = document.querySelector(".minus")
const point = document.querySelector(".point")
const brace = document.querySelector(".brace")




const updateResult = () => {
    action.innerText = actualResult
    pointerlast = actualResult.lastIndexOf('.')
    multilast = actualResult.lastIndexOf('×')
    divisionlast = actualResult.lastIndexOf('÷')
    additionlast = actualResult.lastIndexOf('+')
    power = actualResult.lastIndexOf('^')
    substractionlast = actualResult.lastIndexOf('-')
    bracefirst = actualResult.lastIndexOf('(')
    bracelast = actualResult.lastIndexOf(')')
}

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        actualResult = addNumber(number.innerText, actualResult)
        updateResult()
    })
});

clear.addEventListener('click', () => {
    actualResult = deleteNumber(actualResult)
    updateResult()
});

equal.addEventListener('click', () => {
    lastResult = actualResult + "="
    lastAction.innerText = lastResult

    actualResult = solve(actualResult)
    updateResult()
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

        chooseOperation(operator.innerText)
        updateResult()
    })
});





minus.addEventListener('click', () => {
    const last = actualResult[actualResult.length - 1]
    if ((last === '-') || (last === '.')){
        return
    }

    actualResult = actualResult + "-"
    updateResult()
})
brace.addEventListener('click', () => {
    actualResult = actualResult + "("
    updateResult()
})


point.addEventListener('click', () => {
    const last = actualResult[actualResult.length - 1]
    if (last === '.') {
        return
    }
    if((pointerlast > multilast) && (pointerlast > divisionlast) && (pointerlast > additionlast) && (pointerlast > power) && (pointerlast > substractionlast) && (pointerlast > bracefirst) && (pointerlast > bracelast)){
        return
    }

    actualResult = actualResult + "."
    updateResult()
})
