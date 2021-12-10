import { Suite } from '../suites'
import numberIsAbundant from '../utilities/number-is-abundant'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 23
    }

    public async solution (): Promise<number | string> {
        let result = 0

        const LIMIT = 28123
        // Menomize an array stating if each position is an anbundant number
        const arrayOfAbundants: number[] = []
        const isSumOfAbundants: boolean[] = []

        // Fill the isAmbundantArray
        for (let i = 12; i <= LIMIT; i++) {
            if(numberIsAbundant(i)) arrayOfAbundants.push(i)
        }

        // Double loop arrayOfAbundants, their sum isSumOfAbundants
        for (let indexA = 0; indexA < arrayOfAbundants.length; indexA++) {
            for (let indexB = indexA; indexB < arrayOfAbundants.length; indexB++) {
                const abundatA = arrayOfAbundants[indexA]
                const abundatB = arrayOfAbundants[indexB]
                if (abundatA + abundatB > LIMIT) break
                isSumOfAbundants[abundatA + abundatB] = true
            }   
        }

        // For all numbers to limit, add them if not in isSumOfAbundants array
        for (let scan = 1; scan <= LIMIT; scan++) {
            if (!isSumOfAbundants[scan]) result += scan
        }

        return result
    }
}

export default new suite()
