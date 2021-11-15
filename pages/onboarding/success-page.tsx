import { Flex, VStack } from "@chakra-ui/layout"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { OnboardingNav } from "../../component/layouts"
import { SuccessCard } from "../../component/onboarding"
import { links } from "../../constants"
import { getCookie, setCookie } from "../../lib"

export default function SuccessPage() {
    const [status, setStatus] = useState(typeof window !== "undefined" ? getCookie("created-account") : "")
    const altStatus = typeof window !== "undefined" ? getCookie("created-account") : ""
    const router = useRouter()
    if (typeof window !== "undefined") {
        if (altStatus === "") {
            router.push(links.registerOrganization)
        } else {
            setCookie("created-account", "done", -20)
        }
    }
    useEffect(() => {
        setStatus(typeof window !== "undefined" ? getCookie("created-account") : "")
    }, [])
    return (
        <>
            {(status !== "" || altStatus !== "") &&
                <VStack>
                    <OnboardingNav />
                    <Flex w="fit-content">
                        <SuccessCard />
                    </Flex>
                </VStack>
            }
        </>
    )
}