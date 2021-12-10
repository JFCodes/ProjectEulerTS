import { Suite } from '../suites'
import numberDivisorsCount from '../utilities/numberDivisorsCount'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 12
    }

    public solution (): number | string {
        let result = 0
        let natural = 1

        while (numberDivisorsCount(result) < 500) {
            result += natural
            natural++
        }

        return result
    }
}

export default new suite()
