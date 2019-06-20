import { Suite } from '../suites'

import StringSum from '../utilities/StringSum'

class suite implements Suite {
    problem: number
    summary: string

    constructor () {
        this.problem = 20
        this.summary = `
        n! means n × (n − 1) × ... × 3 × 2 × 1
        For example, 10! = 10 × 9 × ... × 3 × 2 × 1 = 3628800,
        and the sum of the digits in the number 10! is 3 + 6 + 2 + 8 + 8 + 0 + 0 = 27.
        Find the sum of the digits in the number 100!
        `
    }

    public solution (): number | string {
        let result = 0

        const LIMIT = 100
        let currentNumber = '1'
        let subNumber = currentNumber

        for (let n = 2; n <= LIMIT; n++) {
            for (let iteration = 2; iteration <= n; iteration++) {
                currentNumber = StringSum(currentNumber, subNumber)
            }
            subNumber = currentNumber
        }

        currentNumber.split('').map(numberString => {
            result += Number(numberString)
        })

        return result
    }
}

export default new suite()
