import { Flex } from "@chakra-ui/layout"
import { CircularProgress } from "@chakra-ui/progress"
import { useRouter } from "next/router"
import React, { useContext, useEffect } from "react"
import { APP_BASE_URL, links } from "../constants"
import { AuthContext } from "../provider/auth-provider"

export default function PassCallback(_props: any) {
    const { loginWithPassport } = useContext(AuthContext)
    const router = useRouter()
    const queryparams =router.asPath.split("?")
    // debugger
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
    useEffect(() => {
        // debugger
        if (typeof code !== "undefined") {
            loginWithPassport(code as string).then(() => {
                // debugger
                router.push(links.dashboard)
            })
        } else {
            router.push("/")
        }
    }, [code, loginWithPassport, router])
    return (
        <Flex height="100vh">
            <CircularProgress isIndeterminate color="brand.primary-blue" m="auto" size="120px" />
        </Flex>
    )
}