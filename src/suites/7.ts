import { Suite } from '../suites'

import PrimeSieveGenerator from '../utilities/PrimeSieveGenerator'

class suite implements Suite {
    problem: number
    summary: string

    constructor () {
        this.problem = 7
        this.summary = `
        By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.
        What is the 10 001st prime number?
        `
    }

    public solution (): number | string {
        let result = 0

        // Following link explains the sensible search limit
        // https://en.wikipedia.org/wiki/Prime_number_theorem#Approximations_for_the_nth_prime_number

        const LIMIT = 10001 // then thounsand and one
        const SENSIBLE_SEARCH_LIMIT = 120000
        const primeGenerator = new PrimeSieveGenerator(SENSIBLE_SEARCH_LIMIT)

        result = primeGenerator.getTHPrime(LIMIT)

        return result
    }
}

export default new suite()
