import { Suite } from '../suites'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 40
    }
    
    public async solution (): Promise<number | string> {
        let result = 1

        const LAST_DIGIT = 1000000 // one million, must be solution of 10 ^ n
        let nextInteger = 0
        let digitsCounter = 0
        let targetBase = 1

        while (digitsCounter <= LAST_DIGIT) {
            nextInteger++
            let integerString = String(nextInteger)
            digitsCounter += integerString.length 

            if (digitsCounter >= targetBase) {
                let relativePosition = targetBase - (digitsCounter - integerString.length) - 1
                let targetDigit = Number(integerString[relativePosition])
                
                result = result * targetDigit
                targetBase = targetBase * 10
            }
        }

        return result
    }
}

export default new suite()
