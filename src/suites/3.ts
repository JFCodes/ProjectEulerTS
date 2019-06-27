import { Suite } from '../suites'

import PrimeSieveGenerator from '../utilities/PrimeSieveGenerator'

class suite implements Suite {
    problem: number
    summary: string

    constructor () {
        this.problem = 3
    }

    public solution (): number | string {
        let result = 0

        const LIMIT = 600851475143
        const FIRST_POSSIBLE_FACTOR = Math.ceil(Math.sqrt(LIMIT))
        const primeGenerator = new PrimeSieveGenerator(FIRST_POSSIBLE_FACTOR)

        // Cycle from LIMIT until we find the number that is
        // both a prime and the LIMIT FACTOR
        for (let i = FIRST_POSSIBLE_FACTOR; i > 0; i--) {
            // if i is not prime continue
            if (!primeGenerator.isPrime(i)) continue
            // If not a factor of LIMIT continue
            if (LIMIT % i !== 0) continue
            result = i
            break
        }

        return result
    }
}

export default new suite()
