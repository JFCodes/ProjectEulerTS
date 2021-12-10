import { Suite } from '../suites'

import primeSieveGenerator from '../utilities/prime-sieve-generator'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 7
    }

    public solution (): number | string {
        let result = 0

        // Following link explains the sensible search limit
        // https://en.wikipedia.org/wiki/Prime_number_theorem#Approximations_for_the_nth_prime_number

        const LIMIT = 10001 // then thounsand and one
        const SENSIBLE_SEARCH_LIMIT = 120000
        const primeGenerator = new primeSieveGenerator(SENSIBLE_SEARCH_LIMIT)

        result = primeGenerator.getTHPrime(LIMIT)

        return result
    }
}

export default new suite()
