import { cookieKeys, cookiesTimeout } from "../../constants"
import { getCookie, setCookie } from "../../lib"

const postLoginAction = (token: string, refreshToken: string) => {
    setCookie(cookieKeys.token, token, cookiesTimeout.tokenTimeout)
    const tokenDate = new Date()
    setCookie(cookieKeys.tokenDurationDate, tokenDate.getTime().toString(), cookiesTimeout.tokenDurationDateTimeout)
    setCookie(cookieKeys.tokenExpiresIn, `${cookiesTimeout.tokenExpiresInTimeout}`, cookiesTimeout.tokenExpiresInTimeout)
    setCookie(cookieKeys.refreshToken, refreshToken, cookiesTimeout.refreshTokenTimeout)
    const confirmToken = getCookie(cookieKeys.token)
    // if (confirmToken !== "") {
    //     setToken(confirmToken)
    // }
}

export {
    postLoginAction
}