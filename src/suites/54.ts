import { Suite } from '../suites'
import { ReadFromFile } from '../utilities/fsPromises'

enum SUITES {
    CLUBS = 'C',
    SPADES = 'S',
    DIAMONDS = 'D',
    HEARTS = 'H'
}

type HAND = {
    cardMatrix: CARD_MATRIX,
    classification: number | null
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
            const hand1 = this.stringCardsToHand([cards[0],  cards[1], cards[2], cards[3], cards[4] ])
            const hand2 = this.stringCardsToHand([cards[5],  cards[6], cards[7], cards[8], cards[9] ])

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
        const extractOcurranceIndex = (hand: HAND, occur: number): number[] => {
            const values = []
            let hasAce = false
            hand.cardMatrix.numbers.forEach((count, index) => {
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
        if (hand1.cardMatrix.checks.hasStraigth) {
            // If hand 1 is straight A -> 5 and hand 2 does not
            if (hand1.cardMatrix.checks.hasLowAceStraight && !hand2.cardMatrix.checks.hasLowAceStraight) {
                return false
            }
        }

        for (let occurance = 4; occurance > 0; occurance--) {
            p1Values = extractOcurranceIndex(hand1, occurance)
            p2Values = extractOcurranceIndex(hand2, occurance)
            for (let index = 0; index < p1Values.length; index++) {
                if (p1Values[index] > p2Values[index]) return true
                if (p1Values[index] < p2Values[index]) return false
            }
        }

        return null
    }

    private stringCardsToHand(cards: string[]): HAND {
        const hand: HAND = {
            cardMatrix: new CARD_MATRIX(cards),
            classification: 0
        }
        hand.classification = hand.cardMatrix.getClassification()
        return hand
    }
}

// Card matrix class
class CARD_MATRIX {
    numbers: number[]
    suites: { [index: string]: number }
    // A hand classification is combination of the following checks
    public checks: {
        hasOnePair: boolean
        hasTwoPair: boolean
        hasTriple: boolean
        hasFour: boolean
        hasStraigth: boolean
        hasLowAceStraight: boolean
        hasFlush: boolean
    }

    constructor(cards: string[]) {
        this.numbers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        this.suites = {
            [SUITES.CLUBS]: 0,
            [SUITES.DIAMONDS]: 0,
            [SUITES.SPADES]: 0,
            [SUITES.HEARTS]: 0,
        }
        
        cards.forEach((card) => {
            this.suites[card[1]]++

            switch (card[0]) {
                case 'A':
                    this.numbers[0]++
                    break
                case 'T':
                    this.numbers[9]++
                    break
                case 'J':
                    this.numbers[10]++
                    break
                case 'Q':
                    this.numbers[11]++
                    break
                case 'K':
                    this.numbers[12]++
                    break
                default:
                    this.numbers[Number(card[0]) - 1]++
                    break
            }
        })

        const hasStraight = this.getHasStraigth()
        this.checks = {
            hasOnePair: this.numbers.filter(count => count == 2).length === 1,
            hasTwoPair: this.numbers.filter(count => count == 2).length === 2,
            hasTriple: this.numbers.filter(count => count == 3).length === 1,
            hasFour: this.numbers.filter(count => count === 4).length === 1,
            hasStraigth: hasStraight,
            hasLowAceStraight: hasStraight ? this.getHasLowAceStraight() : false,
            hasFlush: Object.values(this.suites).some(count => count === 5)
        }
    }

    public getClassification(): HAND_VALUES {
        if (this.checks.hasFlush && this.checks.hasStraigth) {
            if (this.numbers[0] === 1 && this.numbers[9] === 1) return HAND_VALUES.ROYAL_FLUSH
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
        if (this.numbers.filter(count => count > 1).length > 0) return false

        for (let i = 0; i < this.numbers.length - 3; i++) {
            if (this.numbers[i] !== 1) continue
            if (this.numbers[i] !== this.numbers[i  + 1]) continue
            if (this.numbers[i] !== this.numbers[i  + 2]) continue
            if (this.numbers[i] !== this.numbers[i  + 3]) continue
            if (this.numbers[i] !== this.numbers[i  + 4]) continue
            return true
        }

        // Ace over king special case
        if (this.numbers[9] === 1) {
            if (this.numbers[10] !== 1) return false
            if (this.numbers[11] !== 1) return false
            if (this.numbers[12] !== 1) return false
            if (this.numbers[0] !== 1) return false
            return true
        }

        return false
    }

    private getHasLowAceStraight(): boolean {
        // Only runs if already checked for straight
        // Is low ace straght if index 0 and 1 counts are 1
        return this.numbers[0] === 1 && this.numbers[1] === 1
    }
}

export default new suite()
