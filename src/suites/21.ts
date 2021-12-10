import { Suite } from '../suites'
import sumOfDivisors from '../utilities/sum-of-divisors'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 21
    }

    public solution (): number | string {
        let result = 0

        const LIMIT = 10000
        const memorized = {}

        for (let i = 2; i <= LIMIT; i++) {
            if (memorized[i]) continue

            let sumDivisors = sumOfDivisors(i)
            if (sumDivisors === i) continue
            
            if (sumOfDivisors(sumDivisors) === i) {
                result += i + sumDivisors
                memorized[sumDivisors] = true
            }
        }

        return result
    }
}

export default new suite()
