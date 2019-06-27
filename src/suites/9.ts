import { Suite } from '../suites'

class suite implements Suite {
    problem: number
    summary: string

    constructor () {
        this.problem = 9
    }

    public solution (): number | string {
        let result = 0

        const TARGET_SUM = 1000
        const CONSTANT = (TARGET_SUM * TARGET_SUM) / 2

        for (let valueB = 1; valueB <= TARGET_SUM; valueB ++) {
            // Fuck your mind. No one cares that you don't understand
            // Joking, see explanation below
            let valueA = (CONSTANT - TARGET_SUM * valueB) / (TARGET_SUM - valueB)
            if (valueA % 1 === 0 && valueA > 0) {
                result = valueB * valueA * (TARGET_SUM - valueB - valueA)
                break
            }
        }
        return result
    }
}

/**
 * If a + b + c = LIMIT
 * -> (a + b + c)^2 = LIMIT^2
 * -> a^2 + b^2 + c^2 + 2(ab + bc + ac) = LIMIT^2           // replace left hand c^2 = a^2 + b^2
 * -> a^2 + b^2 + a^2 + b^2 + 2(ab + bc + ac) = LIMIT^2     
 * -> 2a^2 + 2b^2 + 2(ab + bc + ac) = LIMIT^2               // Divide by 2
 * -> a^2 + b^2 + ab + bc + ac = (LIMIT^2 / 2)
 * Here we get that our helper CONSTANT is LIMIT^2 / 2
 * -> (a + b)^2 + c(a + b) = CONSTANT + ab                  // Isolate (a + b) on the right side
 * -> (a + b + c)(a + b) = CONSTANT + ab                    // Replace a + b + c = TARGET_SUM
 * -> TARGET_SUM * a + TARGET_SUM * b - ab = CONSTANT
 * Isolate a
 * -> TARGET_SUM * a - ab = CONSTANT - TARGET_SUM * b
 * -> a(TARGET_SUM - b) = CONSTANT - TARGET_SUM * b
 * Finally
 * -> a = (CONSTANT - TARGET_SUM * b) / (TARGET_SUM - b)
 * 
 * A solution is valid for a TARGET_SUM when given a number b
 * a = (CONSTANT - TARGET_SUM * b) / (TARGET_SUM - b)
 * resolves to an integer number
 */

export default new suite()
