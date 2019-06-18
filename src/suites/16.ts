import { Suite } from '../suites'

import StringSum from '../utilities/StringSum'

class suite implements Suite {
    problem: number
    summary: string

    constructor () {
        this.problem = 16
        this.summary = `
        2^15 = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26.
        What is the sum of the digits of the number 2^1000?
        `
    }

    public solution (): number | string {
        let result = 0
        
        let POWER = 1000
        let number = '2'

        for (let i = 2; i <= POWER; i++) {
            number = StringSum(number, number)
        }

        result = number.split('').reduce((sum, position) => sum + Number(position), 0)
        return result
    }
}

export default new suite()
