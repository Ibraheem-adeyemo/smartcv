import { Divider, Flex, Link } from "@chakra-ui/layout";
import { Avatar, forwardRef, Image, Text } from "@chakra-ui/react";
import React, { createContext, Fragment, useCallback, useEffect } from "react";
import { Images, links, TickIcon } from "../../constants";
import { steps, useOnboarding } from "../../hooks";
import { InterswitchLogo } from "../custom-component";
import NextLink from 'next/link'
import { useRouter } from "next/router";
import { CreateBank } from "../onboarding";
import { BankInfo, defaultCallback, defaultCallbackInitiator, InstitutionColorInfo, Onboarding as OnboardingModel, Step, SuperAdminInfo } from "../../models";
interface OnboardingProps {
    children: JSX.Element
}
const OnboardingLink = forwardRef((props, ref) => {
    const { children, ...rest } = props
    return (
        <Link textAlign="center" as={NextLink} {...rest} ref={ref}>
            <Link textAlign="center" as={"a"} {...rest}>{children}</Link>
        </Link>)
})

type OnboardingContext = ReturnType<typeof useOnboarding>
export const onboardingContext = createContext<OnboardingContext>(
    { steps, 
    changeIsRefresh:() => (""),
    addInfo:() => (""),
    refresh:() => (""),
    completeForm: () => (""),
    resetForm:  () => (""),
    previousState:  () => ("")
     })
export default function Onboarding(props: OnboardingProps) {
    const { steps, onboarding, changeIsRefresh, addInfo, refresh, completeForm, resetForm, previousState  } = useOnboarding()
    // useEffect(() => console.log({ c: onboarding }))
    const router = useRouter()
    // console.log({ router })
    const { step } = router.query
    const { Provider } = onboardingContext
    const LoadAvatar = useCallback(({ i, x }: { i: number, x: Step }) => {
        // let loadTab;
        // debugger
        if (typeof window !== "undefined" && typeof onboarding !== "undefined") {
            // debugger
            if (i === onboarding?.state) {
                return <Avatar name={`${i + 1}`} bgColor="brand.muted-blue"></Avatar>
            } else{
                const tab = onboarding[x.key as keyof OnboardingModel] as BankInfo | SuperAdminInfo | InstitutionColorInfo
                // debugger
                if (tab.completed) {
                    return <Avatar bgColor="brand.primary-blue" icon={<TickIcon color="white" />}></Avatar>
                }
            }
        }
        return <Avatar name={`${i + 1}`} bgColor={"brand.page-header"}></Avatar>
    }, [steps, step, onboarding?.state])

    const LoadTextHeader =  useCallback(({ i, x }: { i: number, x: Step }) => {
        if (i < (onboarding?.state as number)) {
            return <Text color={`brand.primary-blue`}>{x.name}</Text>
        }
        else if (i === onboarding?.state) {
            return <Text color={`brand.muted-blue`}>{x.name}</Text>
        } else {
            return <Text>{x.name}</Text>
        }

    }, [steps, step, onboarding?.state])

    const QuestionDivider = useCallback(({ i, arr }: { i: number, arr: Step[] }) => {
        if ((i > 0 && i <= (arr.length - 1) && (onboarding?.state as number) > 0)) {
            return <Divider border="1px solid" borderColor="var(--chakra-colors-brand-muted)" w="184px" />
        }
        return <></>
    }, [onboarding?.state])

    return (
        <Provider value={{ onboarding, steps, changeIsRefresh, addInfo, refresh, completeForm, resetForm, previousState }}>
            <Flex h="100vh" flexDir="column" gridGap="59px" >
                <Flex justifyContent="space-between" h="89px" w="100%" bg="white" pl="42px" pt="26.67" pb="23.67" pos="relative">
                    <Link href="/">
                        <InterswitchLogo />
                    </Link>
                </Flex>
                <Flex mx="306px" gridGap="33px" flexDirection="column" h="100%">
                    <form action={""} method="post" >

                        <Flex gridGap="33px" flexDirection="column">
                            <Flex gridGap={onboarding?.state as number > 0 ? `13px` : `100px`} alignItems="center" justifyContent="space-around">
                                {steps?.map((x, i, arr) =>
                                    <Fragment key={i}>
                                        <QuestionDivider i={i} arr={arr} />
                                        <OnboardingLink href={x.url}>
                                            <Flex d="flex" as="span" flexDir="column" gridGap="8px" alignItems="center">

                                                <LoadAvatar i={i} x={x} />
                                                <LoadTextHeader i={i} x={x} />
                                                <Text textAlign="center">{x.description}</Text>
                                            </Flex>
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