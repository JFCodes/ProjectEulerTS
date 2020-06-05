import { Suite } from '../suites'
import { ReadFromFile } from '../utilities/fsPromises'

enum SUITES {
    CLUBS = 'C',
    SPADES = 'S',
    DIAMONDS = 'D',
    HEARTS = 'H'
}

enum HAND_VALUES {
    HIGH_CARD = 0,
    ONE_PAIR = 1,
    TWO_PAIRS = 2,
    TRIPLE = 3,
    STRAIGHT = 4,
    FLUSH = 5,
    FULL_HOUSE = 6,
    FOUR = 7,
    STRAIGHT_FLUSH = 8,
    ROYAL_FLUSH = 9,
}

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 42
    }

    public async solution (): Promise<number | string> {
        let result = 0

        const POKER_FILE = await ReadFromFile({ fileName: 'src/files/54.txt'})
        const POKER_PLAYS = POKER_FILE.split('\n')

        POKER_PLAYS.forEach((pokerPlay) => {
            const cards = pokerPlay.split(' ')
            const hand1 = new HAND([cards[0],  cards[1], cards[2], cards[3], cards[4] ])
            const hand2 = new HAND([cards[5],  cards[6], cards[7], cards[8], cards[9] ])

            if (this.p1Wins(hand1, hand2)) result++
        })
        
        return result
    }

    private p1Wins(hand1: HAND, hand2: HAND): boolean {
        if (hand1.classification < hand2.classification) return false
        if (hand1.classification > hand2.classification) return true

        // Tie break situation
        const p1Wins = this.p1WinsTieBreak(hand1, hand2)
        return p1Wins
    }

    private p1WinsTieBreak(hand1: HAND, hand2: HAND): boolean | null {
        const extractOcurranceIndexes = (hand: HAND, occur: number): number[] => {
            const values = []
            let hasAce = false
            hand.matrix.numbers.forEach((count, index) => {
                if (count !== occur) return
                if (index === 0) {
                    hasAce = true
                    return
                }
                values.push(index)
            })
            if (hasAce) values.push(13)
            return values.reverse()
        }

        // May not be obivous but tie breaking only depends on the card value
        // and their repeativeness. So we should compare each rank (4, 3, 2 and single)
        // to determine who wins.
        let p1Values: number[]
        let p2Values: number[]

        // straight special case
        // for the straigh case a A-5 loses to all other straights
        // If hands have a straight
        if (hand1.checks.hasStraigth) {
            // If hand 1 is straight A -> 5 and hand 2 does not
            if (hand1.checks.hasLowAceStraight && !hand2.checks.hasLowAceStraight) {
                return false
            }
        }

        for (let occurance = 4; occurance > 0; occurance--) {
            p1Values = extractOcurranceIndexes(hand1, occurance)
            p2Values = extractOcurranceIndexes(hand2, occurance)
            for (let index = 0; index < p1Values.length; index++) {
                if (p1Values[index] > p2Values[index]) return true
                if (p1Values[index] < p2Values[index]) return false
            }
        }

        return null
    }
}

// Card matrix class
class HAND {
    cards: string[]
    matrix: {
        numbers: number[]
        suites: { [index: string]: number }
    }
    checks: {
        hasOnePair: boolean
        hasTwoPair: boolean
        hasTriple: boolean
        hasFour: boolean
        hasStraigth: boolean
        hasLowAceStraight: boolean
        hasFlush: boolean
    }
    classification: number

    constructor(cards: string[]) {
        this.cards = cards
        this.matrix = {
            numbers: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            suites: {
                [SUITES.CLUBS]: 0,
                [SUITES.DIAMONDS]: 0,
                [SUITES.SPADES]: 0,
                [SUITES.HEARTS]: 0,
            }
        }
        
        cards.forEach((card) => {
            this.matrix.suites[card[1]]++

            switch (card[0]) {
                case 'A':
                    this.matrix.numbers[0]++
                    break
                case 'T':
                    this.matrix.numbers[9]++
                    break
                case 'J':
                    this.matrix.numbers[10]++
                    break
                case 'Q':
                    this.matrix.numbers[11]++
                    break
                case 'K':
                    this.matrix.numbers[12]++
                    break
                default:
                    this.matrix.numbers[Number(card[0]) - 1]++
                    break
            }
        })

        const hasStraight = this.getHasStraigth()
        this.checks = {
            hasOnePair: this.matrix.numbers.filter(count => count == 2).length === 1,
            hasTwoPair: this.matrix.numbers.filter(count => count == 2).length === 2,
            hasTriple: this.matrix.numbers.filter(count => count == 3).length === 1,
            hasFour: this.matrix.numbers.filter(count => count === 4).length === 1,
            hasStraigth: hasStraight,
            hasLowAceStraight: hasStraight ? this.getHasLowAceStraight() : false,
            hasFlush: Object.values(this.matrix.suites).some(count => count === 5)
        }
        this.classification = this.getClassification()
    }

    private getClassification(): HAND_VALUES {
        if (this.checks.hasFlush && this.checks.hasStraigth) {
            if (this.matrix.numbers[0] === 1 && this.matrix.numbers[9] === 1) return HAND_VALUES.ROYAL_FLUSH
            return HAND_VALUES.STRAIGHT_FLUSH
        }
        if (this.checks.hasFour) return HAND_VALUES.FOUR
        if (this.checks.hasTriple && this.checks.hasOnePair) return HAND_VALUES.FULL_HOUSE
        if (this.checks.hasFlush) return HAND_VALUES.FLUSH
        if (this.checks.hasStraigth) return HAND_VALUES.STRAIGHT
        if (this.checks.hasTriple) return HAND_VALUES.TRIPLE
        if (this.checks.hasTwoPair) return HAND_VALUES.TWO_PAIRS
        if (this.checks.hasOnePair) return HAND_VALUES.ONE_PAIR

        return HAND_VALUES.HIGH_CARD
    }

    private getHasStraigth(): boolean {
        // All counts must be 0 or 1 to have a straigth
        if (this.matrix.numbers.filter(count => count > 1).length > 0) return false

        for (let i = 0; i < this.matrix.numbers.length - 3; i++) {
            if (this.matrix.numbers[i] !== 1) continue
            if (this.matrix.numbers[i] !== this.matrix.numbers[i  + 1]) continue
            if (this.matrix.numbers[i] !== this.matrix.numbers[i  + 2]) continue
            if (this.matrix.numbers[i] !== this.matrix.numbers[i  + 3]) continue
            if (this.matrix.numbers[i] !== this.matrix.numbers[i  + 4]) continue
            return true
        }

        // Ace over king special case
        if (this.matrix.numbers[9] === 1) {
            if (this.matrix.numbers[10] !== 1) return false
            if (this.matrix.numbers[11] !== 1) return false
            if (this.matrix.numbers[12] !== 1) return false
            if (this.matrix.numbers[0] !== 1) return false
            return true
        }

        return false
    }

    private getHasLowAceStraight(): boolean {
        // Only runs if already checked for straight
        // Is low ace straght if index 0 and 1 counts are 1
        return this.matrix.numbers[0] === 1 && this.matrix.numbers[1] === 1
    }
}

export default new suite()
