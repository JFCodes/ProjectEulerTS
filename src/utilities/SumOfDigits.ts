/**
 * Given a string of digits, returns de sum of all digits
 */
export default function SumOfDigits(digits: string): number {
    return digits.split('').reduce((acc, digit) => {
        acc += Number(digit);
        return acc
    }, 0)
}
