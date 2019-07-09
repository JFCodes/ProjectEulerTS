import { Suite } from '../suites'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 45
    }

    public async solution (): Promise<number | string> {
        let result = 0

        let increment = 143
        let hexagonal = 0


        while (result === 0) {
            increment++
            hexagonal = increment * (2 * increment - 1)

            const testTriangle = (-1 + Math.sqrt(1 + (8 * hexagonal))) / 2
            if (testTriangle % 1 !== 0) continue

            const testPentagonal = (1 + Math.sqrt(1 + (24 * hexagonal))) / 6
            if (testPentagonal % 1 !== 0) continue

            result = hexagonal
        }

        return result
    }
}

export default new suite()
