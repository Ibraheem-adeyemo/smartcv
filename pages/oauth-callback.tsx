import { CircularProgress } from "@chakra-ui/progress"
import { useToast, Flex } from "@chakra-ui/react"
import { NextPage } from "next"
import { useRouter } from "next/router"
import React, { useContext, useEffect } from "react"
import { AnimatedText } from "../src/component/framer"
import { cookieKeys, cookiesTimeout, links, notificationMesage } from "../src/constants"
import { getCookie, setCookie } from "../src/lib"
import { AuthContext } from "../src/providers"

const OauthCallback: NextPage = () => {
    const { loginWithPassport, user, userDetail, error, userDetailError } = useContext(AuthContext)
    const router = useRouter()
    const toast = useToast()
    useEffect(() => {

        const url = new URL(`${window.location.protocol}//${window.location.host}${router.asPath}`).search
        const code = new URLSearchParams(url).get("code");
        if (typeof window !== "undefined" && typeof code !== "undefined") {

            loginWithPassport(code as string).then(() => {
                if(user && userDetail){
                    if (getCookie(cookieKeys.redirectUrl) !== "") {
                        const redirectUrl = getCookie(cookieKeys.redirectUrl)
                        setCookie(cookieKeys.redirectUrl, "", cookiesTimeout.timeoutCookie)
                        router.push(redirectUrl)
                    } else {
                        router.push(links.dashboard)
                    }
                }
                
            }).catch((err) => {

                typeof err !== "undefined" ?
                    toast({
                        status: "error",
                        title: typeof err.message === "undefined" ? err : err.message,
                        variant: "left-accent",
                        isClosable: true
                    }) :
                    toast({
                        status: "error",
                        title: notificationMesage.AnErrorOccurred,
                        variant: "left-accent",
                        isClosable: true
                    })
                router.push("/")
            })
        }
    }, [])

    useEffect(() => {
        if(error || userDetailError) {
            userDetailError? toast({
                status: "error",
                title: userDetailError.message,
                variant: "left-accent",
                isClosable: true
            }) : "";
            error? toast({
                status: "error",
                title: error.message,
                variant: "left-accent",
                isClosable: true
            }) : "";
            
            router.push("/")
        }
        if(user && userDetail){
            if (getCookie(cookieKeys.redirectUrl) !== "") {
                const redirectUrl = getCookie(cookieKeys.redirectUrl)
                setCookie(cookieKeys.redirectUrl, "", cookiesTimeout.timeoutCookie)
                router.push(redirectUrl)
            } else {
                router.push(links.dashboard)
            }
        }
    }, [user, userDetail, error, userDetailError])

    return (
        <Flex sx={{
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
            flexDir:"column",
            gap:"40px"
        }}>
            <CircularProgress isIndeterminate color="brand.primary-blue" size="120px" />
            <AnimatedText variant="page-header" size="page-header">Authenticating user...</AnimatedText>
        </Flex>
    )
}
export default OauthCallback