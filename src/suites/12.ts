import { Suite } from '../suites'

import NumberDivisorsCount from '../utilities/NumberDivisorsCount'

class suite implements Suite {
    problem: number
    summary: string

    constructor () {
        this.problem = 12
    }

    public solution (): number | string {
        let result = 0
        let natural = 1

        while (NumberDivisorsCount(result) < 500) {
            result += natural
            natural++
        }

        return result
    }
}

export default new suite()
