import { Suite } from '../suites'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 48
    }

    public async solution (): Promise<number | string> {
        let result = 0

        // The last ten digits is the mod of 10e10 
        const MODOF = 10000000000
        const POWER = 1000

        // The last 10 digits is the sum of all powers and their last ten digits
        // to all sum and powers
        for (let i = 1; i <= POWER; i++) {
            let parcel = i
            for (let j = 2; j <= i; j++) {
                parcel = (parcel * i) % MODOF
            }

            result = (result + parcel) % MODOF
        }

        return result
    }
}

export default new suite()
