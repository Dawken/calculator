let operation = undefined
import {actualResult} from "./index";

export const chooseOperation = (operator) => {

    if (actualResult !== '' || operator === '-' || operator === '(') {
        operation = operator
        actualResult = actualResult + operator

    }
    if (actualResult === '') {
        return
    }

}