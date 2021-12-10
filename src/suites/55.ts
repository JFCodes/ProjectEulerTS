import { Suite } from '../suites'
import isPalindrome from '../utilities/is-palindrome'

const LYCHREL_THRESHOLD = 50

/**
 * NOTE: tested MEMOIZATION
 * saving all sum series that prove not to be LYCHREL numbers was slower.
 * The LIMIT (10000) and the threshold of 50 prove not to scale
 * fast enough to compensate the overhead of a big object that saves
 * the sum series that are not LYCHREL...
 * 
 * In my machine -> no memoization 24ms vs with memoization 33ms
 */

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 55
    }

    public async solution (): Promise<number | string> {
        let result = 0

        const TARGET = 10000 // ten thousand

        // All number below 5 are automatically non Lychrel because
        // their first sum are below 10 which are palindrome by default
        for (let test = 5; test < TARGET; test++) {
            if (isLychrelNumber(test)) result++
        }

        return result
    }
}

function isLychrelNumber(test: number) {
    let sum = test
    const reverse = (n: number) => {
        return Number(String(n).split('').reverse().join(''))
    }

    for (let iteration = 1; iteration <= LYCHREL_THRESHOLD; iteration++) {
        sum = sum + reverse(sum)
        if (isPalindrome(sum)) return false
    }

    return true
}

export default new suite()
