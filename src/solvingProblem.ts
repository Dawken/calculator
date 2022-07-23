export const solve = (actualResult: string) => {
    actualResult = actualResult.replaceAll("÷", "/")
    actualResult = actualResult.replaceAll("×", "*")
    actualResult = actualResult.replaceAll("^", "**")

    return eval(actualResult);

}
