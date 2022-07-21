
export const solve = (actualResult) => {
    actualResult = actualResult.replaceAll("÷", "/")
    actualResult = actualResult.replaceAll("×", "*")
    actualResult = actualResult.replaceAll("^", "**")
    return eval(actualResult);
}
