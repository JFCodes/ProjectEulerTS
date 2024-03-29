import { Suite } from '../suites'
import combinations from '../utilities/combinations'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 53
    }

    public async solution (): Promise<number | string> {
        let result = 0

        const TARGET = 1000000 // one million

        for (let pool = 1; pool <= 100; pool++) {
            for (let draws = 1; draws <= pool; draws++) {
                if (combinations(pool, draws) > TARGET) result++
            }
        }
        
        return result
    }
}

export default new suite()
