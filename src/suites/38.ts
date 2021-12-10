import { Suite } from '../suites'
import isPandigital from '../utilities/is-pandigital'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 39
    }
    
    public async solution (): Promise<number | string> {
        let result = ''

        // The greteast base number is 4 digits long because
        // if the number is 5 digits: xxxxx (1, 2) is 10 digits lon, which cannot be pandigital 9 
        const LIMIT = 9999
        const PANDIGITAL_TARGET = 9

        for (let base = LIMIT; base >= 1; base = base - 1) {
            let nextN = 1
            let checkString = String(base) // For n = 1

            while (checkString.length < 9) {
                nextN++
                checkString += String(base * nextN)

                if (checkString.length > 9) break
                if (isPandigital(PANDIGITAL_TARGET, checkString)) {
                    result = checkString
                }
            }

            if (result) break
        }

        return result
    }
}

export default new suite()
