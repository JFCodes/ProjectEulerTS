import { Suite } from '../suites'

import PrimeSieveGenerator from '../utilities/PrimeSieveGenerator'

class suite implements Suite {
    problem: number
    summary: string

    constructor () {
        this.problem = 10
        this.summary = `
        The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.
        Find the sum of all the primes below two million.
        `
    }

    public solution (): number | string {
        let result = 0

        const LIMIT = 2000000 // two millions
        const primeGenerator = new PrimeSieveGenerator(LIMIT)

        for (let i = 2; i <= LIMIT; i++) {
            if (primeGenerator.isPrime(i)) result += i
        }

        return result
    }
}

export default new suite()
