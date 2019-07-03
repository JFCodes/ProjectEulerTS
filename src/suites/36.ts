import { Suite } from '../suites'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 36
    }
    
    private BinaryIsPalindromic (target: number) {
        const binaryString = (target >>> 0).toString(2)
        const reverseString = binaryString.split('').reverse().join('')
        
        return binaryString === reverseString
    }

    private NumberIsPalindromic (target: number) {
        const targetString = String(target)
        const reverseString = targetString.split('').reverse().join('')

        return targetString === reverseString
    }

    public async solution (): Promise<number | string> {
        let result = 0

        let LIMIT = 1000000 // One million

        // Even numbers cannot be binary palindomes because the binary representation
        // will start with 1 and finish with 0. Loop step is 2

        for (let candidate = 1; candidate < LIMIT; candidate = candidate + 2) {
            if (!this.BinaryIsPalindromic(candidate)) continue
            if (!this.NumberIsPalindromic(candidate)) continue
            result += candidate
        }

        return result
    }
}

export default new suite()
