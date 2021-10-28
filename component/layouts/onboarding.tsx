import { Flex, Link } from "@chakra-ui/layout";
import { Avatar, forwardRef, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Images } from "../../constants";
import { useOnboarding } from "../../hooks";
import { InterswitchLogo } from "../custom-component";
import NextLink from 'next/link'
interface OnboardingProps {
    children: JSX.Element
}
const OnboardingLink =  forwardRef((props, ref) => {
    const {children, key, ...rest} = props
    return<Link as = {NextLink} {...rest} ref={ref}><Link as={"a"} key={key} {...rest}>{children}</Link></Link>
})

export default function Onboarding(props: OnboardingProps) {
    const { steps, onboarding } = useOnboarding()
    return (
        <Flex h="100vh" flexDir="column" gridGap="59px" >
            <Flex justifyContent="space-between" h="89px" w="100%" bg="white">
                <InterswitchLogo />
            </Flex>
            <Flex mx="306px" gridGap="33px" flexDirection="column">
                <Flex gripGap="100px" justifyContent="space-around">
                    {steps.map((x, i) =>
                            <OnboardingLink d="flex"  href={x.url} key={i} flexDir="column" gridGap="8px" alignItems="center">
                                <Avatar name={`${i + 1}`} bgColor={i === onboarding?.state?"brand.primary-blue":"brand.page-header"}>
                                </Avatar>
                                <Text>{x.name}</Text>
                                <Text>{x.description}</Text>
                            </OnboardingLink>
                    )}
                </Flex>
                <Flex>
                    {props.children}
                </Flex>
            </Flex>
        </Flex>
    )
}