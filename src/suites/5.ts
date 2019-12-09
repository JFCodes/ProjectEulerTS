import { Suite } from '../suites'
import PrimeSieveGenerator from '../utilities/PrimeSieveGenerator'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 5
    }

    private getMinimumIncrement (limit: number) {
        const primeArray = new PrimeSieveGenerator(limit)
        const primesNumbers = primeArray.getPrimesArray(limit)

        return primesNumbers.reduce((sum, prime) => sum * prime, 1)
    }
    
    private isEvenlyDivisable (number:number, limit: number) {
        for (let i = 1; i <= limit; i++) {
            if (number % i !== 0) return false
        }
        return true
    }

    public solution (): number | string {
        let result = 0

        // For the first X numbers
        // the LCM of 0 to X, is the product off all
        // prime numbers between 1 and X

        const LIMIT = 20
        const INCREMENT = this.getMinimumIncrement(LIMIT)
        let test = 0

        // TODO: add sensable exist condition
        do {
            test += INCREMENT
            if (this.isEvenlyDivisable(test, LIMIT)) result = test

        } while (result === 0)

        return result
    }
}

export default new suite()
