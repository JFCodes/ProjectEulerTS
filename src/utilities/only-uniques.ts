export default function (testString: string) {
    let memorize = {}

    for (let character of testString) {
        if (memorize[character]) return false
        memorize[character] = true
    }

    return true
}
