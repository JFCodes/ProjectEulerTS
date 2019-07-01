import { Suite } from '../suites'

import DivisionCycleLength from '../utilities/DivisionCycleLength'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 26
    }

    public async solution (): Promise<number | string> {
        let result = 0

        const LIMIT = 1000
        let maxLenght = 0

        for(let i = 1; i < LIMIT; i++) {
            const cycleLength = DivisionCycleLength(i)
            if (cycleLength > maxLenght) {
                maxLenght = cycleLength
                result = i
            }
        }

        return result
    }
}

export default new suite()
