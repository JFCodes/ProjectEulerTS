export default function isPandigital(target: number, checkString: string): boolean {
    // String length must be equal to target
    if (checkString.length !== target) return false
    // Its not pandigital if from 1 to target, the number is not present in the string
    // Note how, because the length must be equal to the target this strategy
    // also catches non unique numbers
    for (let test = 1; test <= target; test++) {
        if (checkString.indexOf(String(test)) === -1) return false
    }
    
    return true
}