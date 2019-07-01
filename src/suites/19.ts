import { Suite } from '../suites'

interface BaseOneDate {
    weekday: number // Monday 1, Tuesday 1, etc
    day: number // Day of the month
    month: number // January 1, February 2, etc...
    year: number
}

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 19
    }

    private getNextDay (oDate: BaseOneDate): number {
        let isLeapYear = false

        if (oDate.year % 400 === 0) {
            isLeapYear = true
        } else if (oDate.year % 100 === 0) {
            isLeapYear = false
        } else {
            isLeapYear = oDate.year % 4 === 0
        }
        
        switch (oDate.month) {
            case 2:
                if (oDate.day === 29) return 1
                if (oDate.day === 28 && !isLeapYear) return 1
                return oDate.day + 1
            case 4:
            case 6:
            case 9:
            case 11:
                if (oDate.day === 30) return 1
                return oDate.day + 1
            default:
                if (oDate.day === 31) return 1
                return oDate.day + 1
        }
    }

    private generateNextDate (oDate: BaseOneDate): BaseOneDate {
        let newDate = Object.assign({}, oDate)
        
        newDate.day = this.getNextDay(oDate)

        if (newDate.day === 1) {
            newDate.month++
            if (newDate.month === 13) {
                newDate.month = 1
                newDate.year++
            }
        }

        newDate.weekday = newDate.weekday === 7 ? 1 : newDate.weekday + 1

        return newDate
    }

    public solution (): number | string {
        let result = 0

        let currentDate = {
            weekday: 1,
            day: 1,
            month: 1,
            year: 1900
        }

        while (!(currentDate.day === 31 && currentDate.month === 12 && currentDate.year === 2000)) {
            currentDate = this.generateNextDate(currentDate)

            if (currentDate.year >= 1901 && currentDate.year <= 2000) {
                if (currentDate.day === 1 && currentDate.weekday === 7) {
                    result++
                }
            }
        }

        return result
    }
}

export default new suite()
