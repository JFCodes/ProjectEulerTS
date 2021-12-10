import { Suite } from '../suites'
import primeSieveGenerator from '../utilities/prime-sieve-generator'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 46
    }

    public async solution (): Promise<number | string> {
        let result = 0
        
        // TODO: can we ever justify this limit?
        const LIMIT = 10000
        const primeGenerator = new primeSieveGenerator(LIMIT)
        let candidate = 9

        while (result === 0) {
            if (!primeGenerator.isPrime(candidate)) {

                for (let test = 2; test < candidate; test++) {
                    if (primeGenerator.isPrime(test)) {
                        if (Math.sqrt((candidate - test) / 2) % 1 === 0) break
                    }
                    if (test === candidate - 1) {
                        result = candidate
                    }
                }
            }
            candidate += 2
        }

        return result
    }
}

export default new suite()
