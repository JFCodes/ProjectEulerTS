import { Suite } from '../suites'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 52
    }

    public async solution (): Promise<number | string> {
        let result = 0

        // TODO: justify why test starts at 123456
        let test = 123456
        const isSameSignature = (s1, s2, s3, s4, s5, s6) => {
            if (s1 !== s2) return false
            if (s1 !== s3) return false
            if (s1 !== s4) return false
            if (s1 !== s5) return false
            return s1 === s6
        }
        
        while (result === 0) {
            const s1 = this.getDigitSignature(test)
            const s2 = this.getDigitSignature(test * 2)
            const s3 = this.getDigitSignature(test * 3)
            const s4 = this.getDigitSignature(test * 4)
            const s5 = this.getDigitSignature(test * 5)
            const s6 = this.getDigitSignature(test * 6)

            if (isSameSignature(s1, s2, s3, s4, s5, s6)) result = test
            test++
        }

        return result
    }

    private getDigitSignature (number): string {
        // count the number of digit occurences in the
        // same position has the digit.
        // [0] counts occurences of digit 0
        // [1] counts occurences of digit 1
        // and so on.
        // The result is a digit counter signature.
        // Numbers using the same digits have the same digit signature.
        let signature = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        String(number).split('').forEach((digit) => {
            signature[digit]++
        })

        return signature.join('')
    }
}

export default new suite()
