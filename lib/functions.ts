import _ from "lodash";

export function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}
export function shortenNumber(amount: number) {
    let t = { fractionAmount: Number.MAX_VALUE, abbrev: "" }
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
        }, { fractionAmount: Number.MAX_VALUE, abbrev: "" })

    }
    return t
}

export function isEmptyObject<T>(obj: Record<keyof T, string | boolean >[]) {
    return _.flow(_.values, _.compact, _.isEmpty)(obj)
}

export function validateUppercase(str:string) {
  return  /[A-Z]/.test(str)
}

export function validateLowercase(str:string) {
    return /[a-z]/.test(str)
}

export function validateNumber(str:string) {
    return /[0-9]/.test(str)
}

export function validateEmail(email:string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function comparePassword(pass1: string, pass2:string) {
    return pass1 === pass2
}