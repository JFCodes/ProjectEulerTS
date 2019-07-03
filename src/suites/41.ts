import { Suite } from '../suites'

import isPandigital from '../utilities/isPandigital'
import PrimeSieveGenerator from '../utilities/PrimeSieveGenerator'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 41
    }
    
    public async solution (): Promise<number | string> {
        let result = 0

        // 9 digits number cannot be prime and pandigital (1 + 2 + ... + 9 = 45), 45 divisable by 5
        // 8 digits number cannot be prime and pandigital (1 + 2 + ... + 9 = 36), 36 divisable by 3
        // Largets 7 digit number pandigital is 7654321, hence the limit
        const LIMIT = 7654321
        const primeGenerator = new PrimeSieveGenerator(LIMIT)

        for (let candidate = LIMIT; candidate > 0; candidate--) {
            if (!primeGenerator.isPrime(candidate)) continue
            let candidateString = String(candidate)
            if (!isPandigital(candidateString.length, candidateString)) continue
            result = candidate
            break
        }

        return result
    }
}

export default new suite()
