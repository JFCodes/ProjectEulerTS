import { Suite } from '../suites'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 14
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
