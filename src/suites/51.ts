import { Suite } from '../suites'
import primeSieveGenerator from '../utilities/prime-sieve-generator'

interface TestResult {
    primeCounter: number
    smallest: number
}
class suite implements Suite {
    problem: number
    summary: string
    primeGenerator: null | primeSieveGenerator

    constructor () {
        this.problem = 51
        this.primeGenerator = null
    }

    public solution (): number | string {
        const LIMIT = 999999 // Hypothesis that the number is a 6 digit one
        const START_NUMBER = 100000 // Smallest 6 digit number
        const PRIME_COUNT_TARGET = 8

        this.primeGenerator = new primeSieveGenerator(LIMIT)

        for (let test = START_NUMBER; test <= LIMIT; test++) {
            // Only test if the number itself is prime
            // Reason is any of the replacements will fall to the first
            // number being prime anyway...
            if (!this.primeGenerator.isPrime(test)) continue

            // Return the smallest of the iterated number
            // when that generated 8 primes
            const result: TestResult = this.testReplacements(test)
            if (result.primeCounter === PRIME_COUNT_TARGET) return result.smallest
        }

        throw new Error('Could not find correct answer')
    }

    /**
     * Replaceing 1 to all digits - 1 positions with 0 through 9
     * count how many of those replacements are prime.
     * Return smallest number with replacement with the hights number of primes
     */
    private testReplacements(test: number): { primeCounter: number, smallest: number } {
        const testArray = String(test).split('')
        let smallest = 0
        let primeCounter = 0

        const replace = (character: string, replacementArray: Array<number | null>): number => {
            // Clone testArray
            let replaced = testArray.map(number => number)
            // For each replacement, replace with digit if not null
            replacementArray.forEach(position => {
                if (position !== null) replaced[position] = character
            })
            return Number(replaced.join(''))
        }

        const testDigits = (replacementArray: Array<number | null>) => {
            let localSmallest = 0
            let localPrimeCounter = 0
            for (let digit = 0; digit <= 9; digit++) {
                // Ignore replacements of position 0 with digit 0
                if (replacementArray[0] === 0 && digit === 0) continue
                // Test one replacement
                let replaced: number = replace(String(digit), replacementArray)
                if (!localSmallest) localSmallest = replaced
                if (this.primeGenerator.isPrime(Number(replaced))) localPrimeCounter++
            }
            // Check if the replacement with the digits outputs
            // more primes then current primeCounter
            if (localPrimeCounter > primeCounter) {
                primeCounter = localPrimeCounter
                smallest = localSmallest
            }
        }

        // We are looping 1 to 5 positions.
        // No point replacing all 6 positions other wise we are testing 000000, 111111, 222222, ...
        // p1, p2,... p5 represent how many positions we are replacing
        // NOT THE POSITION ITSELF
        for (let p1 = 0; p1 < 6; p1++ ) {
            testDigits([p1, null, null, null, null])

            for (let p2 = p1 + 1; p2 < 6; p2++ ) {
                testDigits([p1, p2, null, null, null])

                for (let p3 = p2 + 1; p3 < 6; p3++ ) {
                    testDigits([p1, p2, p3, null, null])

                    for (let p4 = p3 + 1; p4 < 6; p4++ ) {
                        testDigits([p1, p2, p3, p4, null])
                        
                        for (let p5 = p4 + 1; p5 < 6; p5++ ) {
                            testDigits([p1, p2, p3, p4, p5])
                        }
                    }
                }
            }
        }

        return { primeCounter, smallest }
    }
}

export default new suite()
