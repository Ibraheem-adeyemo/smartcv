import { useEffect, useState } from 'react'
import useSWR, { useSWRConfig } from 'swr'
import { apiUrlsv1, appRoles, AuthenticatedPage, CLIENT_ID, cookieKeys, cookiesTimeout, grantTypes, links, SECRET } from '../constants'
import { clearUserFromLocalStorage, fetchJson, getCookie, getUserFromLocalStorage, setCookie, setUserToLocalStorage } from '../lib'
import { APIResponse, AuthModel, CredAuthDataModel, CredentialsAuthModel, LoginCredentialBody, RefreshTokenRequestBody, tenantAdmin, TokenRequestBody, TokenResponsBody, UserModel } from '../models'

export default function useAuthentication() {
    // const url = "/api/passport"
    const url = apiUrlsv1.passporProfileUrl
    const { mutate } = useSWRConfig();
    const [token, setToken] = useState<string>(typeof window !== "undefined" ? getCookie(cookieKeys.token) : "")

    const [userFromLocalStorage, setUserFromLocalStorage] = useState(getUserFromLocalStorage())
    
    const { data: user, mutate: _mutate, error } = useSWR<AuthModel>(typeof window === "undefined" || !token ? null : userFromLocalStorage? null: url)
    const { data: userDetail, mutate: _userDetailMutate, error:userDetailError } = useSWR<UserModel>(!user &&  !userFromLocalStorage? null: (!user &&  userFromLocalStorage ? null : `${apiUrlsv1.getUserDetail}/${user?.email}`))
    
    // const userDetail: any | undefined = {
    //     role: {
    //         name: appRoles.superAdmin
    //     },
    //     tenant: {
    //         code: "787"
    //     }
    // }
    // const userDetailError:any| undefined = undefined 
    // const [user, setUser] = useState<any>()
    

    const forceUserToSetFromLocalStorage: any = () => {
        setUserFromLocalStorage(getUserFromLocalStorage())
        setToken(typeof window !== "undefined" ? getCookie(cookieKeys.token) : "")
    }
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
            clearUserFromLocalStorage();
            setUserFromLocalStorage(undefined)
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
    forceUserToSetFromLocalStorage()
    }, [])

    useEffect(() => {
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
            if (!userDetail && userDetailError) {
                const shouldRedirect = AuthenticatedPage.some(x => x === window.location.pathname)


                if (shouldRedirect) {
                    setCookie(cookieKeys.redirectUrl, window.location.pathname, cookiesTimeout.redirectUrlTimeout)
                   
                    window.location.href = links.login
                }
            }
        }
    }, [token])

    const loginWithCredentials = async (obj: LoginCredentialBody) => {
        
        try {

            const response = await fetchJson<CredAuthDataModel>(apiUrlsv1.loginWithCredential, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            })



            if (typeof response !== "undefined") {
                setUserToLocalStorage(response)
                forceUserToSetFromLocalStorage()
                postLoginAction(response.passport.access_token, response.passport.refresh_token)
            }

        } catch (error) {
            console.log(error, obj)
            throw error
        }
    }

    const loginWithPassport = async (code: string) => {

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

    return { user: !user? {firstName: userFromLocalStorage?.passport.firstName, lastName: userFromLocalStorage?.passport.lastName, email: userFromLocalStorage?.passport.email,access_token: userFromLocalStorage?.passport.access_token, id: userFromLocalStorage?.userInfo.id.toString()} as AuthModel :user, userDetail: !userDetail?userFromLocalStorage?.userInfo:userDetail, token, error, userDetailError, signIn, signOut, loginWithPassport, refreshAccessToken, loginWithCredentials, forceUserToSetFromLocalStorage }
}

