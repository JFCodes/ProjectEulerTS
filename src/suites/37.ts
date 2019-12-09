import { Suite } from '../suites'
import PrimeSieveGenerator from '../utilities/PrimeSieveGenerator'

class suite implements Suite {
    problem: number
    LIMIT: number
    primeGenerator: PrimeSieveGenerator

    constructor () {
        this.problem = 37
        this.LIMIT = 1000000 // one million
        this.primeGenerator = new PrimeSieveGenerator(this.LIMIT)
    }
    
    private subNumbersArePrime (target: number, leftToRight: boolean) {
        let targetString = String(target)
        if (!this.primeGenerator.primeArray[targetString]) return false

        while (targetString.length > 1) {
            targetString = leftToRight ? targetString.substr(1) : targetString.substr(0, targetString.length - 1)
            if (!this.primeGenerator.primeArray[targetString]) return false
        }

        return true
    }

    public async solution (): Promise<number | string> {
        let result = 0

        // While its given that there are only 11 prime number
        // We still need to justify the sensible limit for the primeGenerator
        let solutions = 0
        let candidate = 10

        while (solutions < 11) {
            candidate++
            if (!this.subNumbersArePrime(candidate, true)) continue
            if (!this.subNumbersArePrime(candidate, false)) continue
            result += candidate
            solutions++
        }

        return result
    }
}

export default new suite()
