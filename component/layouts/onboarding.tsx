import { Flex, Link } from "@chakra-ui/layout";
import { Avatar, forwardRef, Image, Text } from "@chakra-ui/react";
import React, { createContext, Fragment, useCallback, useEffect } from "react";
import { Images, links, TickIcon } from "../../constants";
import { steps, useOnboarding } from "../../hooks";
import { InterswitchLogo } from "../custom-component";
import NextLink from 'next/link'
import { useRouter } from "next/router";
import { CreateBank } from "../onboarding";
import { BankInfo, InstitutionColorInfo, Step, SuperAdminInfo } from "../../models";
interface OnboardingProps {
    children: JSX.Element
}
const OnboardingLink = forwardRef((props, ref) => {
    const { children, ...rest } = props
    return (
        <Link as={NextLink} {...rest} ref={ref}>
            <Link as={"a"} {...rest}>{children}</Link>
        </Link>)
})

type OnboardingContext = ReturnType<typeof useOnboarding>
export const onboardingContext = createContext<OnboardingContext>({steps})
export default function Onboarding(props: OnboardingProps) {
    const { steps, onboarding, changeOnboarding, changeIsRefresh } = useOnboarding()
    // useEffect(() => console.log({ c: onboarding }))
    const router = useRouter()
    console.log({ router })
    const { step } = router.query
    const { Provider } = onboardingContext
    const LoadAvatar = useCallback(({ i, x }: { i: number, x: Step }) => {
        let loadTab;
        // debugger
        if (typeof window !== "undefined") {
            // debugger
            switch (x.url) {
                case links.createBank:
                    loadTab = onboarding?.bankInfo
                    break
                case links.createSuperAdmin:
                    loadTab = onboarding?.superAdminInfo
                    break
                case links.institutionColors:
                    loadTab = onboarding?.institutionColorInfo
                    break
                default:
                    loadTab = { completed: false }
                    break
            }
            if (i === onboarding?.state) {
                {
                    return <Avatar name={`${i + 1}`} bgColor="brand.primary-blue"></Avatar>
                }
            } else if (loadTab?.completed) {
                return <Avatar bgColor="brand.primary-blue" icon={<TickIcon color="white" />}></Avatar>
            }
        }
        return <Avatar name={`${i + 1}`} bgColor={"brand.page-header"}></Avatar>
    }, [steps, step])
    return (
        <Provider value={{ steps, onboarding, changeOnboarding, changeIsRefresh }}>
            <Flex h="100vh" flexDir="column" gridGap="59px" >
                <Flex justifyContent="space-between" h="89px" w="100%" bg="white">
                    <InterswitchLogo />
                </Flex>
                <Flex mx="306px" gridGap="33px" flexDirection="column">
                    <form action={""} method="post" >

                        <Flex gridGap="33px" flexDirection="column">
                            <Flex gridGap="100px" justifyContent="space-around">
                                {steps?.map((x, i) =>
                                    <Fragment key={i}>
                                        <OnboardingLink href={x.url}>
                                            <Flex d="flex" as="span" flexDir="column" gridGap="8px" alignItems="center">
                                                <LoadAvatar i={i} x ={x} />
                                                <Text>{x.name}</Text>
                                                <Text>{x.description}</Text></Flex>
                                        </OnboardingLink>
                                    </Fragment>
                                )}
                            </Flex>
                            <Flex>
                                {props.children}
                            </Flex>
                        </Flex>
                    </form>
                </Flex>
            </Flex>
        </Provider>
    )
}