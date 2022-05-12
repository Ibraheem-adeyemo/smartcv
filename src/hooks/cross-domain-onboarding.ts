import { useCallback, useEffect, useState } from "react";
import { allowedApp, links, onboardingCrossDomain, sessionStorageKeys, sessionStorageTimeout } from "../constants";
import { AllowedApp, Onboarding, PostMessage } from "../models";

enum intervalKeys {
    fromAnotherOrigin = "from-another-origin",
    interchangeId = "interchange-id"
}

interface CrossDomainInterval {
    key: string,
    interval: NodeJS.Timer
}

export default function useCrossDomainOnboarding() {
    const [isOnCrossDomain, setisOnCrossDomain] = useState(false)
    const [isOnInterval, setIsOnInterval] = useState<CrossDomainInterval[]>()
    const [selectedApp, setSelectedApp] = useState<AllowedApp>()
    const [message, setMessage] = useState<PostMessage>()
    const [cantVew, setCantView] = useState(false)

    const removeData = useCallback(() => {
        const keyFromStorage = window.sessionStorage.getItem(sessionStorageKeys.fromAnotherOrigin)
        if (keyFromStorage === selectedApp?.key) {
            cancelDomainReconnecitonInterval()
            window.sessionStorage.removeItem(sessionStorageKeys.fromAnotherOrigin)
            window.sessionStorage.removeItem(sessionStorageKeys.fromAnotherOriginSetDate)
            window.sessionStorage.removeItem(sessionStorageKeys.fromAnotherOriginTimeout)

        }
    },[selectedApp ])

    const validateKeyAndSetData = useCallback(() => {
        if (message?.value === selectedApp?.key) {
            const go = new URL(selectedApp?.origin as string)

            // setCookie(cookieKeys.fromAnotherOrigin, selectApp.origin, cookiesTimeout.fromAnotherOriginTimeout, go.host)
            window.sessionStorage.setItem(sessionStorageKeys.fromAnotherOrigin, selectedApp?.key as string)
            window.sessionStorage.setItem(sessionStorageKeys.fromAnotherOriginSetDate, (new Date()).toString())
            window.sessionStorage.setItem(sessionStorageKeys.fromAnotherOriginTimeout, `${sessionStorageTimeout.fromAnotherOriginTimeout}`)
            
        } else {
            setCantView(true)
        }
    }, [selectedApp, selectedApp])


    const setInterChangeIdData = useCallback((interChangeId: string) => {

        if (isOnCrossDomain) {
            window.sessionStorage.setItem(sessionStorageKeys.interchangeId, interChangeId)
            window.sessionStorage.setItem(sessionStorageKeys.interchangeIdSetDate, window.sessionStorage.getItem(sessionStorageKeys.fromAnotherOriginSetDate) as string)
            setIsOnInterval(prev => {
                const intervals = prev
                const currentInterval = {
                    key: intervalKeys.interchangeId, interval: setInterval(() => {

                        // window.top?.location.reload()
                        window.sessionStorage.removeItem(sessionStorageKeys.interchangeId)
                        window.sessionStorage.removeItem(sessionStorageKeys.interchangeIdSetDate)
                        clearInterval(isOnInterval?.find(x => x.key === intervalKeys.interchangeId)?.interval as NodeJS.Timer)
                        window.location.href = links.registerOrganization
                    }, sessionStorageTimeout.interchangeIdTimeout * 1000 * 60)
                } as CrossDomainInterval
                if (typeof intervals === "undefined") {
                    return [currentInterval]
                } else {
                    intervals.push(currentInterval)
                }
                return intervals
            })
        }
    }, [isOnCrossDomain])

    const registerSelectedApp = useCallback((origin?: string) => {
        if (typeof window !== "undefined") {
            const StoredSelectedAppKey = window.sessionStorage.getItem(sessionStorageKeys.fromAnotherOrigin)
            // console.log({StoredSelectedAppKey})
            if(StoredSelectedAppKey){
                setSelectedApp(allowedApp.find((x) => StoredSelectedAppKey === x.key))
            } else {
                setSelectedApp(allowedApp.find((x) => origin === x.origin))
            }
        }
    }, [])

    const cancelDomainReconnecitonInterval = useCallback(() => {
        if (typeof isOnInterval !== "undefined" && isOnInterval.findIndex(x => x.key === intervalKeys.fromAnotherOrigin) > -1) {
            clearInterval(isOnInterval.find(x => x.key === intervalKeys.fromAnotherOrigin)?.interval as NodeJS.Timer)
            setIsOnInterval((prev) => {
                const intervals = prev
                return intervals?.filter(x => x.key !== intervalKeys.fromAnotherOrigin)
            })
        }
    }, [])

    const getSelectedApp = useCallback(() => {
        // debugger
        const appKey = window.sessionStorage.getItem(sessionStorageKeys.fromAnotherOrigin)
        // debugger
        if(appKey){
            // console.log({appKey})
            const a = allowedApp.find(x => x.key === appKey)
            // console.log({a})
            setSelectedApp(a)
            reconnect()
            registerSelectedApp()
            // allowedApp.find(x => x.key === appKey)
        }
    }, [])

    const reconnect = useCallback((origin?: string) => {
        // console.log({selectedApp})
        const appKey = window.sessionStorage.getItem(sessionStorageKeys.fromAnotherOrigin)
        const a = allowedApp.find(x => x.key === appKey)
        if(a){
            setMessage({ "action": onboardingCrossDomain.reconnect })
        }
    }, [])

    useCallback(() => {
        // debugger
        if(selectedApp && message)  {
            window.parent.postMessage(JSON.stringify(message), selectedApp.origin)
        }
    }, [message, selectedApp])

    const completeContract = (onboarding: Onboarding) => {

    }


    useEffect(() => {
        // console.log({message, selectedApp})
        if (typeof message !== "undefined" && typeof selectedApp !== "undefined") {
            // debugger
                // console.log({message, selectedApp})
            if (message.action === onboardingCrossDomain.loading) {
                setMessage({ "action": onboardingCrossDomain.loaded })
                
                // console.log(message.payload) /* Do something with the data from onboarding portal */
            } else if (message.action === onboardingCrossDomain.confirmKey) {
                // debugger
                validateKeyAndSetData()
                setisOnCrossDomain(true)
                setIsOnInterval((prev) => {
                    const intervals = prev
                    const currentInterval = {
                        key: intervalKeys.fromAnotherOrigin, interval: setInterval(() => {

                            // window.top?.location.reload()
                            getSelectedApp()
                        }, sessionStorageTimeout.fromAnotherOriginTimeout * 1000 * 60)
                    } as CrossDomainInterval
                    if (typeof intervals !== "undefined") {
                        intervals.push(currentInterval)
                    } else {
                        return [currentInterval]
                    }
                    return intervals
                })
            } else if(message.action === onboardingCrossDomain.loaded || message.action === onboardingCrossDomain.reconnect || message.action === onboardingCrossDomain.accountCreated) {
                // console.log({message})
                
                window.parent.postMessage(JSON.stringify(message), selectedApp.origin)
            }
        }
        
        const readEventMsg = (ev: MessageEvent<any>) => {
            // debugger
            setisOnCrossDomain(false)

            if (ev.data && allowedApp.some((x) => x.origin === ev.origin)) {
                const message = JSON.parse(ev.data) as PostMessage
                setMessage(message)
                registerSelectedApp(ev.origin)
            }
        }


        if (typeof window !== "undefined") {
            // debugger
            window.addEventListener("message", readEventMsg)
        }
        // getSelectedApp()
        return () => {
            window.removeEventListener("message", readEventMsg)
        }
    }, [selectedApp, message])
    const sendCreatedAccount = useCallback((data: any) => {
        const appKey = window.sessionStorage.getItem(sessionStorageKeys.fromAnotherOrigin)
        // debugger
        setMessage({ "action": onboardingCrossDomain.accountCreated, value: data })
        if(appKey){
            // console.log({appKey})
            const a = allowedApp.find(x => x.key === appKey)
            // console.log({a})
            setMessage(undefined)
            setSelectedApp(a)

        }
    }, [])
    return {
        cantVew,
        isOnCrossDomain,
        removeData,
        setInterChangeIdData,
        getSelectedApp,
        sendCreatedAccount
    }
}

