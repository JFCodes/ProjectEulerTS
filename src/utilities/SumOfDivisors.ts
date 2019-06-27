function SumOfDivisors(targetNumber: number) {
    let result = 1
    let LIMIT = Math.ceil(Math.sqrt(targetNumber))

    for (let i = 2; i < LIMIT; i++) {
        if (targetNumber % i === 0) {
            result += i + targetNumber / i
        }
    }

    return result
}

export default SumOfDivisors
