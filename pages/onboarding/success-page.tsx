import { Center, Flex, VStack } from "@chakra-ui/layout"
import { CircularProgress } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { OnboardingNav } from "../../component/layouts"
import { SuccessCard } from "../../component/onboarding"
import { links } from "../../constants"
import { getCookie } from "../../lib"

export default function SuccessPage() {
    const [status, setStatus] = useState(typeof window !== "undefined" ? getCookie("created-account") : "")
    const router = useRouter()
   
    useEffect(() => {
        setStatus(typeof window !== "undefined" ? getCookie("created-account") : "")
    }, [])
    useEffect(() => {
        if (typeof window !== "undefined") {
            if (status === "") {
                router.push(links.registerOrganization)
            }
        }
    }, [status])
    return (
        <>
            
                <VStack h="100vh">
                    <OnboardingNav />
                    <Center h="100%">
                    {(status === "") &&
                        <CircularProgress isIndeterminate color="brand.primary-blue" m="auto" size="120px" />
                    }
                    {(status !== "") &&
                        <Flex width="586px" height="485.85px" alignSelf="center">
                            <SuccessCard />
                        </Flex>
                    }
                    </Center>
                </VStack>
            
        </>
    )
}