import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { apiUrls, AuthenticatedPage, CLIENT_ID, GRANT_TYPE, links, PASSPORT_AUTHORIZE_URL, PASSPORT_PROFILE_URL, PASSPORT_TOKEN_URL, REDIRECT_URI, RESPONSE_TYPE, SCOPE, SECRET } from '../constants'
import { fetchJson, getCookie, setCookie } from '../lib'
import { AuthModel, TokenRequestBody } from '../models/auth'
export default function useAuthentication() {
    const { data: user, mutate } = useSWR<AuthModel>(PASSPORT_PROFILE_URL)
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
        window.location.href = apiUrls.passportUrl
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
        
        if(getCookie("token") === "") {
            setToken("")
        }
        if(typeof window !== "undefined") {
            if(typeof user === "undefined") {
                const shouldRedirect = AuthenticatedPage.some(x => x === window.location.pathname)
                if(shouldRedirect) {
                    window.location.href = links.login
                }
            }
        }
    }, [user])

    const loginWithPassport = async (code: string) => {
        // debugger
        const body = {
            client_id: CLIENT_ID,
            redirect_uri: REDIRECT_URI,
            grant_type: GRANT_TYPE,
            code: code
        }
        const urlencoded = new URLSearchParams();
        Object.keys(body).forEach((x) => {
            urlencoded.append(x, body[x as keyof TokenRequestBody])
        })
        try {
            const response = await fetchJson<any, any>(PASSPORT_TOKEN_URL, {
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

        }

    }

    return { user, token, signIn, signOut, loginWithPassport }
}

