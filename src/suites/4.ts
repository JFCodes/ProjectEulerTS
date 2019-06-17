import { Suite } from '../suites'


class suite implements Suite {
    problem: number
    summary: string

    constructor () {
        this.problem = 4
        this.summary = `
        A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.
        Find the largest palindrome made from the product of two 3-digit numbers.
        `
    }

    private isPalindrome (test: number) {
        let testString: string = String(test)
        let stringLength: number = testString.length
        let middleTerm: number = Math.floor(testString.length)

        for (let i = 0; i <= middleTerm; i++) {
            if (testString[i] !== testString[stringLength - 1 - i]) return false
        }
        return true
    }

    public solution (): number | string {
        let result = 0

        let LIMIT = 999 // largest 3 digit number

        // TODO: search for optimization for product 4
        // How can we make a upperbound decreasing search
        // How can we determine a mathmateically sounded lower limit to start from 
        for (let i = 1; i <= LIMIT; i++) {
            for (let j = 1; j <= LIMIT; j++) {
                let product = i * j
                if (this.isPalindrome(product) && product > result) {
                    result = product
                }
            }
        }

        return result
    }
}

export default new suite()
