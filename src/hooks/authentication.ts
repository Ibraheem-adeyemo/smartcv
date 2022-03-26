import { useEffect, useState } from 'react'
import useSWR, { useSWRConfig } from 'swr'
import { apiUrlsv1, AuthenticatedPage, CLIENT_ID, cookieKeys, cookiesTimeout, grantTypes, links, SECRET } from '../constants'
import { fetchJson, getCookie, setCookie } from '../lib'
import { AuthModel, RefreshTokenRequestBody, TokenRequestBody, TokenResponsBody, UserModel } from '../models'
export default function useAuthentication() {
    // const url = "/api/passport"
    const url = apiUrlsv1.passporProfileUrl
    const { mutate } = useSWRConfig()
    const { data: user, mutate: _mutate, error } = useSWR<AuthModel>(typeof window === "undefined" || getCookie(cookieKeys.token) == "" ? null : url)
    const { data: userDetail, mutate: _userDetailMutate, error:userDetailError } = useSWR<UserModel>(!user ? null : `${apiUrlsv1.getUserDetail}/${user.email}`)

    // const [user, setUser] = useState<any>()
    const [token, setToken] = useState<string>(typeof window !== "undefined" ? getCookie(cookieKeys.token) : "")

    const postLoginAction = (token: string, refreshToken: string) => {
        setCookie(cookieKeys.token, token, cookiesTimeout.tokenTimeout)
        const tokenDate = new Date()
        setCookie(cookieKeys.tokenDurationDate, tokenDate.getTime().toString(), cookiesTimeout.tokenDurationDateTimeout)
        setCookie(cookieKeys.tokenExpiresIn, `${cookiesTimeout.tokenExpiresInTimeout}`, cookiesTimeout.tokenExpiresInTimeout)
        setCookie(cookieKeys.refreshToken, refreshToken, cookiesTimeout.refreshTokenTimeout)
        const confirmToken = getCookie(cookieKeys.token)
        if (confirmToken !== "") {
            setToken(confirmToken)
        }
    }

    const signOut = () => {
        setCookie(cookieKeys.token, "", cookiesTimeout.timeoutCookie)
        setCookie(cookieKeys.tokenDurationDate, "", cookiesTimeout.timeoutCookie)
        setCookie(cookieKeys.refreshToken, "", cookiesTimeout.timeoutCookie)
        setCookie(cookieKeys.tokenExpiresIn, "", cookiesTimeout.timeoutCookie)
        const confirmToken = getCookie(cookieKeys.token)
        if (confirmToken === "") {
            setToken("")
            window.location.href = links.login
        }
    }

    const signIn = () => {
        window.location.href = `${apiUrlsv1.passportUrl}${window.location.protocol}//${window.location.host}${links.oauthCallback}`
        // loginWithPassport()
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            const cookieToken = getCookie(cookieKeys.token)
            if (cookieToken !== "") {
                setToken(cookieToken)
            }
        }
    }, [])

    useEffect(() => {
        // debugger
        if(typeof userDetailError !== "undefined" && window) {
            signOut()
        }
    }, [userDetail, userDetailError])
    useEffect(() => {

        if (typeof window !== "undefined") {

            if (getCookie(cookieKeys.token) === "") {
                setToken("")
            }
        }
    }, [user])



    useEffect(() => {

        if (typeof window !== "undefined") {
            if ((typeof user === "undefined" && typeof error !== "undefined") || token === "") {

                // console.log({AuthenticatedPage})
                const shouldRedirect = AuthenticatedPage.some(x => x === window.location.pathname)


                if (shouldRedirect) {
                    setCookie(cookieKeys.redirectUrl, window.location.pathname, cookiesTimeout.redirectUrlTimeout)
                   
                    window.location.href = links.login
                }
            }
        }
    }, [token])



    const loginWithPassport = async (code: string) => {

        // if (typeof code !== "undefined") {
        const body = {
            client_id: CLIENT_ID,
            redirect_uri: `${window.location.protocol}//${window.location.host}${links.oauthCallback}`,
            grant_type: grantTypes.authorizationCode,
            code: code
        }
        const urlencoded = new URLSearchParams();
        for (const x in body) {
            urlencoded.append(x, body[x as keyof TokenRequestBody])
        }
        try {
            const response = await fetchJson<TokenResponsBody>(apiUrlsv1.passportTokenUrl, {
                method: "POST",
                headers: {
                    Authorization: `Basic ${btoa(CLIENT_ID + ':' + SECRET)}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: urlencoded
            })

            if (typeof response !== "undefined") {
                postLoginAction(response.access_token, response.refresh_token)
                mutate(url)
            }
        } catch (error) {
            throw error
        }
        // } else {
        //     try {
        //         const response = await fetchJson<TokenResponsBody>("/api/passport-token", {
        //             method: "POST",
        //             headers: {
        //                 Authorization: `Basic ${btoa(CLIENT_ID + ':' + SECRET)}`,
        //                 "Content-Type": "application/x-www-form-urlencoded"
        //             },
        //         })
        //       
        //         if (typeof response !== "undefined") {
        //             postLoginAction(response.access_token)
        //             mutate(url)
        //             window.location.href = links.dashboard
        //         }
        //     } catch (error) {
        //         throw error
        //     }
        // }

    }

    const refreshAccessToken = async (refresh_token: string) => {
        const body = {
            refresh_token: refresh_token,
            grant_type: grantTypes.refreshToken,
        }
        const urlencoded = new URLSearchParams();
        for (const x in body) {
            urlencoded.append(x, body[x as keyof RefreshTokenRequestBody])
        }
        try {
            const response = await fetchJson<TokenResponsBody>(apiUrlsv1.passportTokenUrl, {
                method: "POST",
                headers: {
                    Authorization: `Basic ${btoa(CLIENT_ID + ':' + SECRET)}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: urlencoded
            })

            if (typeof response !== "undefined") {
                postLoginAction(response.access_token, response.refresh_token)
                mutate(url)
            }
        } catch (error) {
            throw error
        }
    }

    return { user, userDetail, token, error, userDetailError, signIn, signOut, loginWithPassport, refreshAccessToken }
}

