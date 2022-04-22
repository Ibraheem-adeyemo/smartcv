import _ from "lodash";
import { NextApiResponse } from "next";
import { getCookie } from ".";
import { cookieKeys, months, notificationMesage, amountAbbrevications, apiUrlsv1 } from "../constants";
import { APIResponse } from "../models";

export function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}
export function shortenNumber(amount: number) {
    let t = { fractionAmount: Number.MAX_VALUE, abbrev: "" }
    if (!isNaN(amount)) {
        const length = String(amount).length
        t = _.reduce(amountAbbrevications, (prev, curr) => {

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

export function isEmptyObject<T>(obj: Record<keyof T, string | boolean>[]) {
    return _.flow(_.values, _.compact, _.isEmpty)(obj)
}

export function validateUppercase(str: string) {
    return /[A-Z]/.test(str)
}

export function validateLowercase(str: string) {
    return /[a-z]/.test(str)
}

export function validateNumber(str: string) {
    return /[0-9]/.test(str)
}


export function validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function comparePassword(pass1: string, pass2: string) {
    return pass1 === pass2
}

export function validateHexColor(color: string) {
    return /^#[0-9A-F]{6}$/i.test(color) || /^#([0-9A-F]{3}){1,2}$/i.test(color)
}

export function appDate(dateStr: string, withTime = true) {
    let fullDate = ""
    if (typeof dateStr !== "undefined" && dateStr !== null) {
        const date = new Date(dateStr)
        const day = date.getDate()
        const monthNumber = date.getMonth()
        const month = months[monthNumber]
        const year = date.getFullYear()
        const hour = date.getHours() - 12 > 0 ? date.getHours() - 12 : date.getHours()
        const minute = date.getMinutes()
        const minuteString = minute.toString()
        const d = date.getHours() - 12 > -1 ? "PM" : "AM"
        fullDate = `${day}-${month}-${year}`
        if (withTime) {
            fullDate += ` | ${hour === 0 ? 12 : hour}:${minuteString.length === 2 ? minute : 0 + minuteString}${d}`
        }
        return fullDate
    }
    return fullDate
}

export async function checkIfOnline():Promise<boolean> {
    try {
        const online = await fetch(apiUrlsv1.healthCheck);
        return online.status >= 200 && online.status < 300; // either true or false

    } catch (error) {
        return false
    }
}

export async function fetchJson<T extends Record<keyof T, T[keyof T]>>(input: RequestInfo, init?: RequestInit & any): Promise<T> {

    try {
        // console.log({init});
        if (await checkIfOnline()) {

            let token = typeof window !== "undefined" ? getCookie(cookieKeys.token) : ""
            const response = token !== "" ? await fetch(input, typeof init === "undefined" ? {
                method: "GET",
                headers: {
                    Authorization: `bearer ${token}`
                }
            } : init) : await fetch(input, init);
            const data = await response.json() as APIResponse<T>
            // debugger
            if (response.ok) {
                if (typeof data.data !== "undefined") {
                    return data.data as T;
                } else {
                    return data as unknown as T
                }
            }
            else if (typeof data !== "undefined") {
                // debugger
                if (typeof data.message !== "undefined") {
                    // debugger
                    throw data.message
                } else if(typeof (data as any).error !== "undefined") {
                    // debugger
                    throw (data as any).error
                }else {
                    throw (data as unknown as any).error_description
                }
            } else {
                throw `${notificationMesage.Oops} ${notificationMesage.AnErrorOccurred}`
            }
        } else {

            throw notificationMesage.offline
        }

    } catch (error: any) {
        // debugger
        // console.error({error})
        throw error
    }

}