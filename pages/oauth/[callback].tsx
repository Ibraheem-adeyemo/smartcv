import { Flex } from "@chakra-ui/layout"
import { CircularProgress } from "@chakra-ui/progress"
import { useToast } from "@chakra-ui/react"
import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import React, { useContext, useEffect } from "react"
import { APP_BASE_URL, links, notificationMesage } from "../../constants"
import { AuthContext } from "../../provider/auth-provider"

export default function PassCallback(_props: any) {
    const { loginWithPassport } = useContext(AuthContext)
    const router = useRouter()
    // debugger
    const queryparams = router.asPath.split("?")
    const { callback } = router.query
    const url = new URL(`${APP_BASE_URL}${router.asPath}`).search
    const code = new URLSearchParams(url).get("code");
    // if(queryparams.length>1) {
    //     const splitParams = queryparams[1].split("&")
    //     if(splitParams.length > 0) {
    //         splitParams.forEach((x) => {
    //             const splitParam = 
    //         })
    //     }
    // }
    const toast = useToast()
    useEffect(() => {
        if (typeof window !== "undefined" && typeof callback !== "undefined" && typeof code !== "undefined") {
            debugger
            switch (callback) {
                case "pass":
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
                    break
                default:
                    router.push("/")
            }
        }
    }, [callback])
    return (
        <Flex height="100vh">
            <CircularProgress isIndeterminate color="brand.primary-blue" m="auto" size="120px" />
        </Flex>
    )
}