import { Suite } from '../suites'
import primeSieveGenerator from '../utilities/prime-sieve-generator'
import numbersArePermutations from '../utilities/numbers-are-permutations'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 49
    }

    public async solution (): Promise<number | string> {
        let result = ''

        const LIMIT = 9999
        const LOWER_BOUND = 7660 // NOTE 2
        const EXCLUDE = 8147 // Exclude the other known solution from the problem set
        const primeGenerator = new primeSieveGenerator(LIMIT)

        const STEP = 3330

        for (let thirdTerm = LOWER_BOUND; thirdTerm <= LIMIT; thirdTerm++) {
            const secondTerm = thirdTerm - STEP
            const firstTerm = secondTerm - STEP
            if (!primeGenerator.isPrime(firstTerm)) continue
            if (!primeGenerator.isPrime(secondTerm)) continue
            if (!primeGenerator.isPrime(thirdTerm)) continue
            // If A is permutation of B, and B is permutation of C, then C is permutation of A
            if (!numbersArePermutations(firstTerm, secondTerm)) continue
            if (!numbersArePermutations(firstTerm, thirdTerm)) continue

            result = `${firstTerm}${secondTerm}${thirdTerm}`
        }

        return result
    }

    // NOTE 2:
    // All the three numbers have to be 4 digists long
    // So the minimum is 1000, so the larger number is, at least 7660
}

export default new suite()
