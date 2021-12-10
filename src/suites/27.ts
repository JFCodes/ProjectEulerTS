import { Suite } from '../suites'
import primeSieveGenerator from '../utilities/prime-sieve-generator'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 27
    }

    public async solution (): Promise<number | string> {
        let result = 0

        const LOWER_BOUND = -999
        const UPPER_BOUND = 999
        let maxConsecutive = 0
        // TODO: justify this prime limit...
        const primeGenerator = new primeSieveGenerator(100000)
        const generateValue = (n: number, coefA: number, coefB: number): number => {
            return (n * n) + (n * coefA) + coefB
        }

        // Note that the generator does not work with even number, so we cycle only odd coeficients
        for (let coeficientB = LOWER_BOUND; coeficientB <= UPPER_BOUND; coeficientB = coeficientB + 2) {
            // Note that when n = 0, coeficientB must be prime
            if (!primeGenerator.isPrime(Math.abs(coeficientB))) continue

            for (let coeficientA = LOWER_BOUND; coeficientA < UPPER_BOUND; coeficientA = coeficientA + 2) {
                let consecutive = 0
                while (primeGenerator.isPrime(Math.abs(generateValue(consecutive, coeficientA, coeficientB)))) {
                    consecutive++
                }

                if (consecutive > maxConsecutive) {
                    maxConsecutive = consecutive
                    result = coeficientA * coeficientB
                }
            }
        }

        return result
    }
}

export default new suite()
