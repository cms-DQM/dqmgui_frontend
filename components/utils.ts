export const seperateRunAndLumiInSearch = (runAndLumi: string) => {
    const runAndLumiArray = runAndLumi.split(':')
    const parsedRun = runAndLumiArray[0]
    const parsedLumi = runAndLumiArray[1] ? parseInt(runAndLumiArray[1]) : 0

    return { parsedRun, parsedLumi }
}