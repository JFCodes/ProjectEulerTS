import { Suite } from '../suites'

import StringSum from '../utilities/StringSum'

class suite implements Suite {
    problem: number
    summary: string

    constructor () {
        this.problem = 20
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
