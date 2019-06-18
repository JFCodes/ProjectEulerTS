/**
 * Sum two strings representing a big number
 */
function StringSum (string_A: string, string_B: string): string {
    const reverseString_A = string_A.split('').reverse().map(pos => Number(pos))
    const reverseString_B = string_B.split('').reverse().map(pos => Number(pos))
    const MAX_LENGTH = Math.max(reverseString_A.length, reverseString_B.length)

    let transpot = 0
    let result = ''

    for(let pos = 0; pos < MAX_LENGTH; pos++) {
        let positionNumber = (reverseString_A[pos] || 0) + (reverseString_B[pos] || 0) + transpot

        result = String(positionNumber % 10) + result
        transpot = Math.floor(positionNumber / 10)
    }

    // If there was a left over transport:
    if (transpot) result = String(transpot) + result 
    
    return result
}

export default StringSum
