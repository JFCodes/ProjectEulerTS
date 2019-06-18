import { Suite } from '../suites'

import StringSum from '../utilities/StringSum'

class suite implements Suite {
    problem: number
    summary: string

    constructor () {
        this.problem = 14
        this.summary = `
        The following iterative sequence is defined for the set of positive integers:
        n → n/2 (n is even)
        n → 3n + 1 (n is odd)
        Using the rule above and starting with 13, we generate the following sequence:
        13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1
        It can be seen that this sequence (starting at 13 and finishing at 1) contains 10 terms. Although it has not been proved yet (Collatz Problem), it is thought that all starting numbers finish at 1.
        Which starting number, under one million, produces the longest chain?
        NOTE: Once the chain starts the terms are allowed to go above one million.
        `
    }

    private nextNumber (current) {
        if (current % 2 === 0) return current / 2
        return (3 * current) + 1
    }

    public solution (): number | string {
        let result = 0
        let maxCounter = 0

        const LIMIT = 1000000 // One million
        // One word, memoization
        const memorizeCounter = []

        for (let i = 1; i < LIMIT; i++) {
            let currentNumber = i
            let counter = 1
            
            while (currentNumber !== 1) {
                currentNumber = this.nextNumber(currentNumber)

                // Only check memorizeCounter if current number under LIMIT
                if (memorizeCounter[currentNumber]) {
                    counter += memorizeCounter[currentNumber]
                    currentNumber = 1
                }

                // Did not find counter memorized, increment it and continue
                counter++
            }

            // Check is possible solution
            if (counter > maxCounter) {
                result = i
                maxCounter = counter
            }
            // Save counter
            memorizeCounter[i] = counter
        }

        return result
    }
}

export default new suite()
