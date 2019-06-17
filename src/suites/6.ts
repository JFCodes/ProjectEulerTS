import { Suite } from '../suites'

class suite implements Suite {
    problem: number
    summary: string

    constructor () {
        this.problem = 6
        this.summary = `
        The sum of the squares of the first ten natural numbers is,
        1^2 + 2^2 + ... + 10^2 = 385
        The square of the sum of the first ten natural numbers is,
        (1 + 2 + ... + 10)^2 = 552 = 3025
        Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is 3025 − 385 = 2640.
        Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.
        `
    }

    public solution (): number | string {
        let result = 0

        const LIMIT = 100
        let sumOfSquares = 0
        let squareOfSums = 0

        for (let i = 1; i <= LIMIT; i++) {
            sumOfSquares += i * i
            squareOfSums += i
        }

        squareOfSums = squareOfSums * squareOfSums
        result = squareOfSums - sumOfSquares

        return result
    }
}

export default new suite()
