import { CircularProgress } from "@chakra-ui/progress"
import { useToast, Flex } from "@chakra-ui/react"
import { NextPage } from "next"
import { useRouter } from "next/router"
import React, { useContext, useEffect } from "react"
import { links, notificationMesage } from "../constants"
import { getCookie, setCookie } from "../lib"
import { AuthContext } from "../provider/auth-provider"

const OauthCallback:NextPage = () => {
    const { loginWithPassport } = useContext(AuthContext)
    const router = useRouter()
    const toast = useToast()
    useEffect(() => {
        // debugger
        const url = new URL(`${window.location.protocol}//${window.location.host}${router.asPath}`).search
        const code = new URLSearchParams(url).get("code");
        if (typeof window !== "undefined" && typeof code !== "undefined") {
            // debugger
            loginWithPassport(code as string).then(() => {
                // debugger 
                if (getCookie("redirectUrl") !== "") {
                    const redirectUrl = getCookie("redirectUrl")
                    setCookie("redirectUrl", "", -10)
                    router.push(redirectUrl)
                } else {
                    router.push(links.dashboard)
                }
            }).catch((err) => {
                // debugger
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
    return (
        <Flex height="100vh">
            <CircularProgress isIndeterminate color="brand.primary-blue" sx={{margin:"auto"}} size="120px" />
        </Flex>
    )
}
export default OauthCallback