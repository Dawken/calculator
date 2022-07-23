export const chooseOperation = (operator: string, actualResult: string) => {

    if (actualResult !== '' && operator !== ')'){
        return actualResult + operator
    }

    return actualResult


}
