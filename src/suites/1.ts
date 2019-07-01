import { Suite } from '../suites'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 1
    }

    public solution (): number | string {
        const LIMIT = 1000
        let sum = 0

        for (let i = 3; i < LIMIT; i++) {
            if (i % 3 === 0 || i % 5 === 0) sum += i
        }
        
        return sum
    }
}

export default new suite()
