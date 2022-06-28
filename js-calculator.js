
const numbers = document.querySelectorAll(".number")
const operators = document.querySelectorAll(".operator")
const clear = document.querySelector(".clear")
const equal = document.querySelector(".equal")
const action = document.querySelector(".action")
const lastaction = document.querySelector(".lastaction")
const minus = document.querySelector(".minus")
const point = document.querySelector(".point")
const brace = document.querySelector(".brace")

let number = ''
let lastresult = ''
let actualresult = ''
let operation = undefined
let symbols = ['×', '÷', '+', 'xy', '-', '(']


const solve = () => {

    actualresult = actualresult.replaceAll("÷", "/")
    actualresult = actualresult.replaceAll("×", "*")
    actualresult = actualresult.replaceAll("^", "**")

    actualresult = eval(actualresult);
}

const chooseOperation = (operator) => {

    if (actualresult != '' || operator == '-' || operator == '(') {
        operation = operator
        actualresult = actualresult + operator
    }
    if (actualresult === '') {
        return
    }
}

const updateResult = () => {
 action.innerText = actualresult
 pointerlast = actualresult.lastIndexOf('.')
 multilast = actualresult.lastIndexOf('×')
 divisionlast = actualresult.lastIndexOf('÷')
 additionlast = actualresult.lastIndexOf('+')
 power = actualresult.lastIndexOf('^')
 substractionlast = actualresult.lastIndexOf('-')
 bracefirst = actualresult.lastIndexOf('(')
 bracelast = actualresult.lastIndexOf(')')

}

const addNumber = (numbers) => {

    actualresult = actualresult.toString() + numbers.toString()

}

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        addNumber(number.innerText)
        updateResult()
    })
});


operators.forEach((operator) => {
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


minus.addEventListener('click', () => {
    const last = actualresult[actualresult.length - 1]
    if ((last === '-') || (last === '.')){
        return
    }

    actualresult = actualresult + "-"
    updateResult()
})
 brace.addEventListener('click', () => {
    actualresult = actualresult + "("
    updateResult()
 })

point.addEventListener('click', () => {
    const last = actualresult[actualresult.length - 1]
    if (last === '.') {
        return
    }
        if((pointerlast > multilast) && (pointerlast > divisionlast) && (pointerlast > additionlast) && (pointerlast > power) && (pointerlast > substractionlast) && (pointerlast > bracefirst) && (pointerlast > bracelast)){
        return 
     }
     
    

     actualresult = actualresult + "."
     updateResult()
 })


const deleteNumber = () => {
    actualresult = String(actualresult);
    actualresult = actualresult.slice(0, -1)
}

clear.addEventListener('click', () => {
    deleteNumber()
    updateResult()
});

equal.addEventListener('click', () => {
    lastresult = actualresult + "="
    lastaction.innerText = lastresult
    
    solve()
    updateResult()
});



