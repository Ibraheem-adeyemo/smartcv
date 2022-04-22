import { Flex } from "@chakra-ui/react"
import { NextPage } from "next"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { MissionStatement } from "../../src/component"
import { RegisterForm } from "../../src/component/auth"
import { InterswitchLogo } from "../../src/component/custom-component"
import { NonAuthenticated } from "../../src/component/layouts"
import { CrossDomainOnboardingProvider } from "../../src/providers"

const ActivateAccountComponent = dynamic(() => import('../../src/component/auth/activate-account'), { ssr: false })


const ActivateAccount: NextPage = () => {
    const router = useRouter()
    let url = ""
    let token = null;
    if (typeof window !== "undefined") {
        url = new URL(`${window.location.protocol}//${window.location.host}${router.asPath}`).search
        token = new URLSearchParams(url).get("token");
    }
    return (
        <NonAuthenticated>
            <Flex sx={{
                flexDir: "column",
                px: ["80px", "80px", "80px", "100px", "147px", "147px",],
                gap: ["30px", "30px", "30px", "30px", "102.61px", "102.61px"],
                py: "34.5px"
            }}>
                <Flex>
                    <InterswitchLogo variant="inverted" alt="Interswitch Logo" />
                </Flex>
                <Flex sx={{
                    gap: ["30px", "30px", "30px", "50px", "99px", "99px"],
                    flexDir: ["column", "column", "column", "column", "row", "row",]
                }}
                >
                    <MissionStatement />
                    <CrossDomainOnboardingProvider>
                        <ActivateAccountComponent activationCode={token} />
                    </CrossDomainOnboardingProvider>
                </Flex>
            </Flex>
        </NonAuthenticated>)
}

export default ActivateAccount