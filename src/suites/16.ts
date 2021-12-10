import { Suite } from '../suites'
import stringSum from '../utilities/string-sum'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 16
    }

    public solution (): number | string {
        let result = 0
        
        let POWER = 1000
        let number = '2'

        for (let i = 2; i <= POWER; i++) {
            number = stringSum(number, number)
        }

        result = number.split('').reduce((sum, position) => sum + Number(position), 0)
        return result
    }
}

export default new suite()
