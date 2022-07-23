export const deleteNumber = (actualResult: string) => {
    actualResult = String(actualResult);
    return actualResult.slice(0, -1)
}
