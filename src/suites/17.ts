import { Suite } from '../suites'

class suite implements Suite {
    problem: number
    summary: string

    constructor () {
        this.problem = 17
    }

    private getUnit (n: number) {
        switch (n) {
            case 0: return ''
            case 1: return 'one'
            case 2: return 'two'
            case 3: return 'three'
            case 4: return 'four'
            case 5: return 'five'
            case 6: return 'six'
            case 7: return 'seven'
            case 8: return 'eight'
            case 9: return 'nine'
        }
    }
    private getFirstDozen (n: number) {
        switch (n) {
            case 10: return 'ten'
            case 11: return 'eleven'
            case 12: return 'twelve'
            case 13: return 'thirteen'
            case 14: return 'fourteen'
            case 15: return 'fifteen'
            case 16: return 'sixteen'
            case 17: return 'seventeen'
            case 18: return 'eighteen'
            case 19: return 'nineteen'
        }
    }
    private getDozen (n: number) {
        switch (n) {
            case 2: return 'twenty'
            case 3: return 'thirty'
            case 4: return 'forty'
            case 5: return 'fifty'
            case 6: return 'sixty'
            case 7: return 'seventy'
            case 8: return 'eighty'
            case 9: return 'ninety'
        }
    }

    private getNumberText (target: number): string {
        // Over 4 digits not supported
        if (target > 9999) return ''
        
        let text = ''
        let toAddAnd = false
        const pieces = String(target).split('').reverse()
        const addAnd = () => {
            if (!toAddAnd) return
            text += 'and'
            toAddAnd = false
        }

        if (pieces[3] && pieces[3] !== '0') {
            text += this.getUnit(Number(pieces[3])) + 'thousand'
            toAddAnd = true
        }
        if (pieces[2] && pieces[2] !== '0') {
            addAnd()
            text += this.getUnit(Number(pieces[2])) + 'hundred'
            toAddAnd = true
        }
        if (pieces[1] && pieces[1] !== '0') {
            addAnd()
            const dozen = Number(pieces[1])
            const unit = Number(pieces[0])

            if (dozen > 1) {
                text += this.getDozen(dozen)
                text += this.getUnit(unit)
            } else {
                text += this.getFirstDozen(10 + unit)
            }

        } else if (pieces[0] !== '0'){
            addAnd()
            text += this.getUnit(Number(pieces[0]))
        }

        return text
    }

    public solution (): number | string {
        let result = 0

        const LIMIT = 1000

        for (let i = 1; i <= 1000; i++) {
            console.log(this.getNumberText(i))
            const numberText = this.getNumberText(i)
            result += numberText.length
        }

        return result
    }
}

export default new suite()
