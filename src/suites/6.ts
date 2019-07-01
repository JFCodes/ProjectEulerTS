import { Suite } from '../suites'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 6
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
