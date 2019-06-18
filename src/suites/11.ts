import { Suite } from '../suites'

import PrimeSieveGenerator from '../utilities/PrimeSieveGenerator'

class suite implements Suite {
    problem: number
    summary: string

    constructor () {
        this.problem = 11
        this.summary = ``
    }

    public solution (): number | string {
        let result = 0

        return result
    }
}

export default new suite()
