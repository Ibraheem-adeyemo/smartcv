export function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}
export function shortenNumber(amount:number) {
    let t = { fractionAmount: Number.MAX_VALUE, abbrev:""}
    const g = [{ abbrev: "T", value: 1000000000000 }, { abbrev: "B", value: 1000000000 }, { abbrev: "M", value: 1000000 }, { abbrev: "K", value: 1000 }]
    if (!isNaN(amount)) {
        const length = String(amount).length
        t = g.reduce((prev, curr) => {
            // debugger
            const fractionAmount = amount / curr.value
            const sp = String(fractionAmount).split(".")
            if (String(sp[0]).length <= 3) {


                return { ...curr, fractionAmount }
            }
            return prev
        }, { fractionAmount: Number.MAX_VALUE, abbrev:"" })

    }
    return t
}