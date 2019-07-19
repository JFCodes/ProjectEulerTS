import { Suite } from '../suites'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 47
    }

    public async solution (): Promise<number | string> {
        let result = 0

        // TODO: justify this limit
        const LIMIT = 1000000 // one million
        const primeFactors: number[] = []
        let consecutive = 0

        // Same strategy as the prime sieve generator, but we incremente the counters
        // of multiples of prime numbers
        for (let i = 2; i <= LIMIT; i++) {
            if (primeFactors[i]) continue

            for (let j = i * 2; j <= LIMIT; j = j + i) {
                if (!primeFactors[j]) primeFactors[j] = 0
                primeFactors[j]++
            }
        }

        // Find four in a row with at least 4 prime factors
        for (let scan = 0; scan <= LIMIT; scan++) {
            if (!primeFactors[scan] || primeFactors[scan] < 4) {
                consecutive = 0
                continue
            }
            consecutive++
            if (consecutive === 4) {
                result = scan - 3
                break
            }
        }

        return result
    }
}

export default new suite()
