export default function isPalindrome(test: number): boolean {
    if (test < 10) return false

    const testString: string = String(test)
    const testStringLength = testString.length
    const lowerMiddle = Math.floor(testStringLength / 2)

    for (let index = 0; index <= lowerMiddle; index++) {
        if (testString[index] !== testString[testStringLength - 1 - index]) return false
    }

    return true
}
