import { Suite } from '../suites'
import StringSum from '../utilities/StringSum'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 25
    }

    public async solution (): Promise<number | string> {
        let result = 2 // Not computing the first 2

        let LIMIT = 1000
        let numberOne = '1'
        let numberTwo = '1'
        let numberFibo = ''

        while(numberFibo.length < LIMIT) {
            numberFibo = StringSum(numberOne, numberTwo)

            numberOne = numberTwo
            numberTwo = numberFibo

            result += 1
        }

        return result
    }
}

export default new suite()
