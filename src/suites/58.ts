import isPrime from '../utilities/is-prime'
import { Suite } from '../suites'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 58
    }

    public async solution (): Promise<number | string> {
        let result = 0

        // To big for prime sieve generator...
        let iteration = 1
        let sideLength = 1
        let diagonals = 1
        let iterationNumber = 1
        let primeCounter = 0
        let primeRatio = 0

        do {
            iteration++
            sideLength += 2

            for(let corner = 1; corner <= 4; corner++) {
                diagonals++
                iterationNumber += sideLength - 1
                if (isPrime(iterationNumber)) primeCounter++
            }

            primeRatio = primeCounter / diagonals
        } while (primeRatio > 0.1)
        
        result = sideLength
        return result
    }
}

export default new suite()
