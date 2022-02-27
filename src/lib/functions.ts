import _ from "lodash";
import { NextApiResponse } from "next";
import { getCookie } from ".";
import { cookieKeys, months, notificationMesage } from "../constants";
import { amountAbbrevications } from "../constants/figures";
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
        const d = date.getHours() - 12 > -1 ? "PM" : "AM"
        fullDate = `${day}-${month}-${year}`
        if (withTime) {
            fullDate += ` | ${hour}:${minute}${d}`
        }
        return fullDate
    }
    return fullDate
}


export async function fetchJson<T extends Record<keyof T, T[keyof T]>>(input: RequestInfo, init?: RequestInit): Promise<T> {

    try {
        // console.log({init});
      
        let token = typeof window !== "undefined" ? getCookie(cookieKeys.token) : ""
        const response = token !== "" ? await fetch(input, typeof init === "undefined" ? {
            method: "GET",
            headers: {
                Authorization: `bearer ${token}`
            }
        } : init) : await fetch(input, init);
        const data = await response.json() as APIResponse<T>
      
        if (response.ok) {
            if (typeof data.data !== "undefined") {
                return data.data as T;
            } else {
                return data as unknown as T
            }
        }
        else if (typeof data !== "undefined") {
          
            if (typeof data.message !== "undefined") {
                throw data.message
            } else {
                throw (data as unknown as any).error_description
            }
        }
        else {
            throw notificationMesage.AnErrorOccurred
        }

    } catch (error: any) {
        throw error
    }

}