import { Suite } from '../suites'

class suite implements Suite {
    problem: number
    FACTORIALS: number[]

    constructor () {
        this.problem = 34
        this.FACTORIALS = [1]

        // Built the FACTORIALS array
        for (let loop = 1; loop < 10; loop++) {
            this.FACTORIALS[loop] = loop * this.FACTORIALS[loop - 1]
        }
    }

    private getSumOfFactorials (target: number): number {
        let sum = 0
        String(target).split('').forEach(numberChar => {
            sum += this.FACTORIALS[numberChar]
        })
        return sum
    }

    public async solution (): Promise<number | string> {
        let result = 0

        // TODO: prove the limit
        // Finding the sensible limit
        let LIMIT = 2540161
        // We only need the factorial of the first 10 digits

        // Do not consider 1! and 2!
        for (let i = 3; i <= LIMIT; i++) {
            if (i === this.getSumOfFactorials(i)) result += i
        }

        return result
    }
}

export default new suite()
