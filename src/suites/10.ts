import { Suite } from '../suites'
import primeSieveGenerator from '../utilities/prime-sieve-generator'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 10
    }

    public solution (): number | string {
        let result = 0

        const LIMIT = 2000000 // two millions
        const primeGenerator = new primeSieveGenerator(LIMIT)

        for (let i = 2; i <= LIMIT; i++) {
            if (primeGenerator.isPrime(i)) result += i
        }

        return result
    }
}

export default new suite()
