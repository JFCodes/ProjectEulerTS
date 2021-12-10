import { Suite } from '../suites'
import primeSieveGenerator from '../utilities/prime-sieve-generator'

class suite implements Suite {
    problem: number
    LIMIT: number
    primeGenerator: primeSieveGenerator

    constructor () {
        this.problem = 35
        this.LIMIT = 1000000 // One million
        this.primeGenerator = new primeSieveGenerator(this.LIMIT)
    }

    private rotationCanBePrime (checkString: string): boolean {
        // Single digits can't be rotated and can be prime
        if (checkString.length === 1) return true
        // A number with any pair or a five digit will have a rotation
        // ending with the pair or 5 digit. Hence, cannot be prime
        if (checkString.indexOf('2') !== -1) return false
        if (checkString.indexOf('4') !== -1) return false
        if (checkString.indexOf('6') !== -1) return false
        if (checkString.indexOf('8') !== -1) return false
        if (checkString.indexOf('5') !== -1) return false

        return true
    }

    private rotationsArePrime (check: string): boolean {
        const numberOfRotations = check.length

        for (let rotation = 1; rotation <= numberOfRotations; rotation++) {
            check = check.substr(1) + check.substr(0, 1)
            if (!this.primeGenerator.primeArray[check]) return false
        }

        return true
    }

    public async solution (): Promise<number | string> {
        let result = 0

        // Possible improvement
        // Memoize primes with known non prime rotations
        // Improvement is escaping the rotation loop sooner

        for (let candidate = 2; candidate < this.LIMIT; candidate++) {
            const candidateString = String(candidate)
            // If rotation cannot be prime, continue
            if (!this.rotationCanBePrime(candidateString)) continue
            if (!this.rotationsArePrime(candidateString)) continue 
            result++
        }

        return result
    }
}

export default new suite()
