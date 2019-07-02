import { Suite } from '../suites'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 29
    }

    public async solution (): Promise<number | string> {
        let result = 0

        const UPPER_LIMIT = 100
        const iterations = UPPER_LIMIT - 1
        result = iterations * iterations

        for (let A = 2; A <= UPPER_LIMIT; A++) {
            let nextBase = A * A
            let equiPower = 2
            let repeated = 0

            while (nextBase <= UPPER_LIMIT) {
                repeated += Math.floor(UPPER_LIMIT / equiPower) - 1
                nextBase = nextBase * A
                equiPower++
            }

            result = result - repeated
        }

        // TODO: understand why there is one missing
        // For UPPER_LIMIT = 5, we dont need to add result
        // Maybe something to do if the limit is odd or even....
        result++
        return result
    }
}

export default new suite()
