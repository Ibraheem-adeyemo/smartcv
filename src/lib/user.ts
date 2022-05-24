import { localStorageKeys } from "../constants"
import {CredAuthDataModel } from "../models"

export function getUserFromLocalStorage() {

    const user = typeof window !== "undefined"? localStorage.getItem(localStorageKeys.user):""

    if(user) {
        return JSON.parse(user) as CredAuthDataModel
    }

    return undefined
}
export function setUserToLocalStorage(user:CredAuthDataModel) {

   typeof window !== "undefined"? localStorage.setItem(localStorageKeys.user, JSON.stringify(user)):""
}

export function clearUserFromLocalStorage() {
    typeof window !== "undefined"? localStorage.removeItem(localStorageKeys.user):""
}