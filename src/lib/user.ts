import { localStorageKeys } from "../constants"
import {CredAuthDataModel } from "../models"

export function getItemFromLocalStorage(item: string) {

    const itemObj = typeof window !== "undefined"? localStorage.getItem(item):""
    if(itemObj) {
        return JSON.parse(itemObj)
    }

    return undefined
}
export function setItemToLocalStorage(key:string, user:(string | CredAuthDataModel)) {
    if(user) {
        typeof window !== "undefined"? localStorage.setItem(key, JSON.stringify(user)):""
    }
}

export function clearUserFromLocalStorage() {

    typeof window !== "undefined"? localStorage.removeItem(localStorageKeys.authMode):""
    typeof window !== "undefined"? localStorage.removeItem(localStorageKeys.user):""
}
