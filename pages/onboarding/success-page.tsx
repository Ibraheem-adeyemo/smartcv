import { Flex, VStack } from "@chakra-ui/layout"
import React from "react"
import { OnboardingNav } from "../../component/layouts"
import { SuccessCard } from "../../component/onboarding"
import { links } from "../../constants"
import withSession, { ServerSideHandler } from "../../lib/session"

// checks for exixsting coookie session to redirect to the correct page
export const getServerSideProps = withSession<ServerSideHandler>(async function getServerSideProps({ req, res }) {
    const createdAccount = req.session.get("created-account")

    if (typeof createdAccount !== "undefined" && createdAccount === "account created") {
        req.session.destroy()
        await req.session.save()
        return {
            props: {

            }
        }

    } else {
        return {
            redirect: {
                destination: links.login,
                permanent: false,
            },
        }
    }
}, 'pass-interchange', 60)

export default function SuccessPage() {
    return (
        <VStack>
        <OnboardingNav />
        <Flex w="fit-content">
            <SuccessCard />
        </Flex>
        </VStack>
        
    )
}