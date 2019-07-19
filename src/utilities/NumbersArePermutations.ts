export default function NumbersArePermutations (checkA: number, checkB: number) {
    const stringA = String(checkA)
    const stringB = String(checkB)

    const countNumbers = (target: string) => {
        let numberCounter = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        target.split('').forEach((stringNumber: string) => {
            numberCounter[Number(stringNumber)]++
        })
        return numberCounter
    }

    const numbersA = countNumbers(stringA)
    const numbersB = countNumbers(stringB)

    for (let i = 0; i <= 9; i++) {
        if (numbersA[i] !== numbersB[i]) return false
    }

    return true
}
