import StringSum from './StringSum'

/**
 * Given a base in string form, return base to the power also in a string
 */
export default function StringPower (base: number, power: number): string {
    // For power 1, the result is the base (n to power 1 = n)
    let result = String(base)
    if (power === 1) return result

    // Already process prower 1, start the power 2
    for (let powerI = 2; powerI <= power; powerI++) {
        let product = result;
        let multiplication = product

        for (let productI = 2; productI <= base; productI++) {
            multiplication = StringSum(multiplication, product)
        }
        
        result = multiplication
    }

    return result
}
