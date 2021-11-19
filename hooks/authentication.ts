import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { apiUrls, AuthenticatedPage, CLIENT_ID, GRANT_TYPE, links, PASSPORT_AUTHORIZE_URL, PASSPORT_PROFILE_URL, PASSPORT_TOKEN_URL, REDIRECT_URI, RESPONSE_TYPE, SCOPE, SECRET } from '../constants'
import { fetchJson, getCookie, setCookie } from '../lib'
import { AuthModel, TokenRequestBody } from '../models/auth'
export default function useAuthentication() {
    const { data: user, mutate, error } = useSWR<AuthModel>(typeof window === "undefined" || getCookie("token") == "" ? null : PASSPORT_PROFILE_URL)
    const [countFlag, setCoountFlag] = useState(0)
    // const [user, setUser] = useState<any>()
    const [token, setToken] = useState<string>(typeof window !== "undefined" ? getCookie("token") : "")

    const postLoginAction = (token: string) => {
        setCookie("token", token, 60)
        const confirmToken = getCookie("token")
        if (confirmToken !== "") {
            setToken(confirmToken)
        }
    }
    const signOut = () => {
        setCookie("token", "", -60)
        const confirmToken = getCookie("token")
        if (confirmToken === "") {
            setToken("")
            window.location.href = links.login
        }
    }
    const signIn = () => {
        window.location.href = `${apiUrls.passportUrl}${window.location.protocol}//${window.location.host}/${REDIRECT_URI}`
    }

    useEffect(() => {
        if (window) {
            const cookieToken = getCookie("token")
            if (cookieToken !== "") {
                setToken(cookieToken)
            }
        }
    }, [])


    useEffect(() => {
        // debugger
        if (typeof window !== "undefined") {

            if (getCookie("token") === "") {
                setToken("")
            }
        }
    }, [user])

    useEffect(() => {
        
        if ((typeof user === "undefined" && typeof error !== "undefined") || token === "") {
            const shouldRedirect = AuthenticatedPage.some(x => x === window.location.pathname)
            // debugger
            if (shouldRedirect) {
                setCookie("redirectUrl", window.location.pathname, 10)
                window.location.href = links.login
            }
        }
    }, [token])

    const loginWithPassport = async (code: string) => {
        // debugger
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
                mutate()
            }
        } catch (error) {
            throw error
        }

    }

    return { user, token, error, signIn, signOut, loginWithPassport }
}

