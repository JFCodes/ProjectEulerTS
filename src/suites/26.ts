import { Suite } from '../suites'
import divisionCycleLength from '../utilities/division-cycle-length'

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
            const cycleLength = divisionCycleLength(i)
            if (cycleLength > maxLenght) {
                maxLenght = cycleLength
                result = i
            }
        }

        return result
    }
}

export default new suite()
