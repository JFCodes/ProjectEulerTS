import { Suite } from '../suites'
import PrimeSieveGenerator from '../utilities/PrimeSieveGenerator'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 50
    }

    public async solution (): Promise<number | string> {
        let result = 0

        const LIMIT = 1000000 // One million
        const MAX_SEQUENCE = 545 // TODO: justify this
        const primeGenerator = new PrimeSieveGenerator(LIMIT)
        const primeList = primeGenerator.getPrimesArray(LIMIT)

        for (let i = MAX_SEQUENCE; i >= 1; i--) {
            let startingPoint = 0

            for (let j = 0; j <= MAX_SEQUENCE; j++) {
                let testSum = 0

                for (let k = startingPoint; k <= i + startingPoint; k++) {
                    testSum += primeList[k]
                }
                if (testSum >= LIMIT) break
                if (primeGenerator.isPrime(testSum)) {
                    result = testSum
                    break
                }

                startingPoint++
            }

            if (result !== 0) break
        }

        return result
    }

    // NOTE 2:
    // All the three numbers have to be 4 digists long
    // So the minimum is 1000, so the larger number is, at least 7660
}

export default new suite()
