import { useEffect, useState } from "react";
import { allowedApp, ALLOWED_APPS, links, onboardingCrossDomain, sessionStorageKeys, sessionStorageTimeout } from "../constants";
import { AllowedApp, PostMessage } from "../models";

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

    const removeData = () => {
        const keyFromStorage = window.sessionStorage.getItem(sessionStorageKeys.fromAnotherOrigin)
        if (keyFromStorage === selectedApp?.key) {
            cancelDomainReconnecitonInterval()
            window.sessionStorage.removeItem(sessionStorageKeys.fromAnotherOrigin)
            window.sessionStorage.removeItem(sessionStorageKeys.fromAnotherOriginSetDate)
            window.sessionStorage.removeItem(sessionStorageKeys.fromAnotherOriginTimeout)

        }
    }

    const validateKeyAndSetData = () => {
        if (message?.value === selectedApp?.key) {
            const go = new URL(selectedApp?.origin as string)
            // debugger
            // setCookie(cookieKeys.fromAnotherOrigin, selectApp.origin, cookiesTimeout.fromAnotherOriginTimeout, go.host)
            window.sessionStorage.setItem(sessionStorageKeys.fromAnotherOrigin, selectedApp?.key as string)
            window.sessionStorage.setItem(sessionStorageKeys.fromAnotherOriginSetDate, (new Date()).toString())
            window.sessionStorage.setItem(sessionStorageKeys.fromAnotherOriginTimeout, `${sessionStorageTimeout.fromAnotherOriginTimeout}`)

        } else {
            setCantView(true)
        }
    }


    const setInterChangeIdData = (interChangeId: string) => {

        if (isOnCrossDomain) {
            window.sessionStorage.setItem(sessionStorageKeys.interchangeId, interChangeId)
            window.sessionStorage.setItem(sessionStorageKeys.interchangeIdSetDate, window.sessionStorage.getItem(sessionStorageKeys.fromAnotherOriginSetDate) as string)
            setIsOnInterval(prev => {
                const intervals = prev
                const currentInterval = { key: intervalKeys.interchangeId, interval: setInterval(() => {
                    // debugger
                    // window.top?.location.reload()
                    window.sessionStorage.removeItem(sessionStorageKeys.interchangeId)
                    window.sessionStorage.removeItem(sessionStorageKeys.interchangeIdSetDate)
                    clearInterval(isOnInterval?.find(x => x.key === intervalKeys.interchangeId)?.interval as NodeJS.Timer)
                    window.location.href= links.registerOrganization
                }, sessionStorageTimeout.interchangeIdTimeout * 1000 * 60) } as CrossDomainInterval
                if (typeof intervals === "undefined") {
                    return [currentInterval]
                } else {
                    intervals.push(currentInterval)
                }
                return intervals
            })
        }
    }

    const registerSelectedApp = (origin?:string) => {
        if(typeof window !== "undefined"){
            const StoredSelectedApp = window.sessionStorage.getItem(sessionStorageKeys.fromAnotherOrigin)
            if(!origin && StoredSelectedApp) {
                origin = StoredSelectedApp
            }

        }
        if(origin) {
            setSelectedApp(allowedApp.find((x) => x.origin === origin) as AllowedApp)
        }
    } 

    const cancelDomainReconnecitonInterval = () => {
        if (typeof isOnInterval !== "undefined" && isOnInterval.findIndex(x => x.key === intervalKeys.fromAnotherOrigin) > -1) {
            clearInterval(isOnInterval.find(x => x.key === intervalKeys.fromAnotherOrigin)?.interval as NodeJS.Timer)
            setIsOnInterval((prev) => {
                const intervals = prev
                return intervals?.filter(x => x.key !== intervalKeys.fromAnotherOrigin)
            })
        }
    }

    const getSelectedApp = () => {
        reconnect()
        registerSelectedApp()
    }

    const reconnect = () => {
        window.parent.postMessage(`{"action":"${onboardingCrossDomain.reconnect}"}`, origin)
    }
    useEffect(() => {

        const readEventMsg = (ev: MessageEvent<any>) => {
            // debugger
            setisOnCrossDomain(false)
            if (ev.data && allowedApp.some((x) => x.origin === ev.origin)) {
                const message = JSON.parse(ev.data) as PostMessage
                setMessage(message)
                registerSelectedApp(ev.origin)
            }
        }

        // ?debugger
        if (typeof window !== "undefined") {
            // debugger
            window.addEventListener("message", readEventMsg)
        }
        return () => {
            window.removeEventListener("message", readEventMsg)
        }
    }, [])

    useEffect(() => {
        if (typeof message !== "undefined" && typeof selectedApp !== "undefined") {
            if (message.action === onboardingCrossDomain.loading) {
                window.parent.postMessage(`{"action":"${onboardingCrossDomain.loaded}"}`, selectedApp.origin)
                // console.log(message.payload) /* Do something with the data from onboarding portal */
            } else if (message.action === onboardingCrossDomain.confirmKey) {
                // debugger
                validateKeyAndSetData()
                setisOnCrossDomain(true)
                setIsOnInterval((prev) => {
                    const intervals = prev
                    const currentInterval = {
                        key: intervalKeys.fromAnotherOrigin, interval: setInterval(() => {
                            // debugger
                            // window.top?.location.reload()
                            reconnect()
                        }, sessionStorageTimeout.fromAnotherOriginTimeout * 1000 * 60)
                    } as CrossDomainInterval
                    if (typeof intervals !== "undefined") {
                        intervals.push(currentInterval)
                    } else {
                        return [currentInterval]
                    }
                    return intervals
                })
            }
        }
    }, [selectedApp, message])

    return {
        cantVew,
        isOnCrossDomain,
        removeData,
        setInterChangeIdData,
        getSelectedApp
    }
}

