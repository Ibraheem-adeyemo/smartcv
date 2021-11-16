import { CircularProgress } from "@chakra-ui/progress"
import { useToast, Flex } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React, { useContext, useEffect } from "react"
import { APP_BASE_URL, links, notificationMesage } from "../constants"
import { AuthContext } from "../provider/auth-provider"

export default function OauthCallback() {
    const { loginWithPassport } = useContext(AuthContext)
    const router = useRouter()
    const toast = useToast()
    useEffect(() => {

        const url = new URL(`${APP_BASE_URL}${router.asPath}`).search
        const code = new URLSearchParams(url).get("code");
        if (typeof window !== "undefined" && typeof code !== "undefined") {
            debugger
            loginWithPassport(code as string).then(() => {
                debugger
                router.push(links.dashboard)
            }).catch((err) => {
                debugger
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
            <CircularProgress isIndeterminate color="brand.primary-blue" m="auto" size="120px" />
        </Flex>
    )
}
