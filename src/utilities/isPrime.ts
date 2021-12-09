export default function isPrime(test: number) {
    const DIVISOR_LIMIT = Math.ceil(Math.sqrt(test));

    for (let divisor = 2; divisor <= DIVISOR_LIMIT; divisor++) {
        if (test % divisor === 0) return false
    }

    return true
}