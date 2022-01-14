import { useEffect, useState } from 'react'
import useSWR, { useSWRConfig } from 'swr'
import { apiUrlsv1, AuthenticatedPage, CLIENT_ID, cookieKeys, GRANT_TYPE, links, PASSPORT_AUTHORIZE_URL, PASSPORT_PROFILE_URL, PASSPORT_TOKEN_URL, REDIRECT_URI, RESPONSE_TYPE, SCOPE, SECRET } from '../constants'
import { fetchJson, getCookie, setCookie } from '../lib'
import { AuthModel, TokenRequestBody } from '../models'
export default function useAuthentication() {
    // const url = "/api/passport"
    const url = PASSPORT_PROFILE_URL
    const { mutate } = useSWRConfig()
    const { data: user, mutate: _mutate, error } = useSWR<AuthModel>(typeof window === "undefined" || getCookie("token") == "" ? null : url)
    const [countFlag, setCoountFlag] = useState(0)
    // const [user, setUser] = useState<any>()
    const [token, setToken] = useState<string>(typeof window !== "undefined" ? getCookie("token") : "")

    const postLoginAction = (token: string) => {
        setCookie(cookieKeys.token, token, 60)
        const confirmToken = getCookie("token")
        if (confirmToken !== "") {
            setToken(confirmToken)
        }
    }
    const signOut = () => {
        setCookie(cookieKeys.token, "", -60)
        const confirmToken = getCookie(cookieKeys.token)
        if (confirmToken === "") {
            setToken("")
            window.location.href = links.login
        }
    }
    const signIn = () => {
        window.location.href = `${apiUrlsv1.passportUrl}${window.location.protocol}//${window.location.host}/${REDIRECT_URI}`
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
        if (typeof window !== "undefined") {

            if (getCookie(cookieKeys.token) === "") {
                setToken("")
            }
        }
    }, [user])

    useEffect(() => {

        if (typeof window !== "undefined") {
            if ((typeof user === "undefined" && typeof error !== "undefined") || token === "") {
                // debugger
                // console.log({AuthenticatedPage})
                const shouldRedirect = AuthenticatedPage.some(x => x === window.location.pathname)

                // debugger
                if (shouldRedirect) {
                    setCookie("redirectUrl", window.location.pathname, 10)
                    window.location.href = links.login
                }
            }
        }
    }, [token])

    const loginWithPassport = async (code?: string) => {
        // debugger
        if (typeof code !== "undefined") {
            const body = {
                client_id: CLIENT_ID,
                redirect_uri: `${window.location.protocol}//${window.location.host}/${REDIRECT_URI}`,
                grant_type: GRANT_TYPE,
                code: code
            }
            const urlencoded = new URLSearchParams();
            Object.keys(body).forEach((x) => {
                urlencoded.append(x, body[x as keyof TokenRequestBody])
            })
            try {
                const response = await fetchJson<any>(PASSPORT_TOKEN_URL, {
                    method: "POST",
                    headers: {
                        Authorization: `Basic ${btoa(CLIENT_ID + ':' + SECRET)}`,
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: urlencoded
                })
                // debugger
                if (typeof response !== "undefined") {
                    postLoginAction(response.access_token)
                    mutate(url)
                }
            } catch (error) {
                throw error
            }
        } else {
            try {
                const response = await fetchJson<any>("/api/passport-token", {
                    method: "POST",
                    headers: {
                        Authorization: `Basic ${btoa(CLIENT_ID + ':' + SECRET)}`,
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                })
                // debugger
                if (typeof response !== "undefined") {
                    postLoginAction(response.access_token)
                    mutate(url)
                    window.location.href = links.dashboard
                }
            } catch (error) {
                throw error
            }
        }

    }

    return { user, token, error, signIn, signOut, loginWithPassport }
}

