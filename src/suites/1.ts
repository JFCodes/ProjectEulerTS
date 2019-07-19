import { Suite } from '../suites'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 1
    }

    public solution (): number | string {
        const LIMIT = 1000
        let sum = 0

        for (let test = 3; test < LIMIT; test++) {
            if (test % 3 === 0 || test % 5 === 0) sum += test
        }
        
        return sum
    }
}

export default new suite()
