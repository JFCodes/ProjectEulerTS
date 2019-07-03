import { Suite } from '../suites'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 39
    }
    
    public async solution (): Promise<number | string> {
        let result = 0

        return result
    }
}

export default new suite()
