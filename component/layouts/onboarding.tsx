import { Divider, Flex, Link } from "@chakra-ui/layout";
import { Avatar, forwardRef, Image, Text, useToast } from "@chakra-ui/react";
import React, { createContext, Fragment, useCallback, useEffect } from "react";
import { Images, links, notificationMesage, onboardingTabs, TickIcon } from "../../constants";
import { initialOnboardingData, useOnboarding } from "../../hooks";
import { InterswitchLogo } from "../custom-component";
import NextLink from 'next/link'
import { useRouter } from "next/router";
import { CreateBank } from "../onboarding";
import { Tenant, defaultCallback, defaultCallbackInitiator, InstitutionColorInfo, Onboarding as OnboardingModel, Step, tenantAdmin } from "../../models";
import { createAccountAsync } from "../../services/v1";
import { OnboardingNav } from '.'
import _ from "lodash";
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

export const onboardingContext = createContext<ReturnType<typeof useOnboarding>>(
    {
        steps: onboardingTabs as Step[],
        changeIsRefresh: () => (""),
        addInfo: () => (""),
        refresh: () => (""),
        completeForm: () => (""),
        resetForm: () => (""),
        previousState: () => (""),
        loading: {isLoading:false, text:""},
        startLoading: () => (""),
        stopLoading: () => ("")
    })
export default function Onboarding(props: OnboardingProps) {
    const { steps, onboarding, changeIsRefresh, addInfo, refresh, completeForm, resetForm, previousState, loading, startLoading, stopLoading } = useOnboarding()
    // useEffect(() => console.log({ c: onboarding }))
    const router = useRouter()
    // console.log({ router })
    const { step } = router.query
    const { Provider } = onboardingContext
    const toast = useToast()
    const LoadAvatar = useCallback(({ i, x }: { i: number, x: Step }) => {
        // let loadTab;
        // debugger
        if (typeof window !== "undefined" && typeof onboarding !== "undefined") {
            // debugger
            if (i === onboarding?.state) {
                return <Avatar name={`${i + 1}`} bgColor="brand.muted-blue"></Avatar>
            } else {
                const tab = onboarding[x.key as keyof OnboardingModel] as Tenant | tenantAdmin | InstitutionColorInfo
                // debugger
                if (tab.completed) {
                    return <Avatar bgColor="brand.primary-blue" icon={<TickIcon color="white" />}></Avatar>
                }
            }
        }
        return <Avatar name={`${i + 1}`} bgColor={"brand.page-header"}></Avatar>
    }, [steps, step, onboarding?.state])

    const LoadTextHeader = useCallback(({ i, x }: { i: number, x: Step }) => {
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

    const createAccount = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // debugger
        startLoading()
        try {
            if (typeof onboarding !== "undefined") {
                await createAccountAsync(onboarding as OnboardingModel)
                toast({
                    status: "success",
                    title: notificationMesage.SuccessfulAccountCreation,
                    isClosable: true,
                    variant: "left-accent"
                })
                
                router.push(links.onboardingSuccessPage)
            } else {
                toast({
                    status: "error",
                    title: notificationMesage.CantSubmitForm,
                    isClosable: true,
                    variant: "left-accent"
                })
            }
            stopLoading()
        } catch (error: any) {
            // debugger
            if (typeof error.message !== "undefined" || typeof error !== "undefined") {
                toast({
                    status: "error",
                    title: typeof error.message !== "undefined"? error.message:error,
                    isClosable: true,
                    variant: "left-accent"
                })
            }
            console.error({ createAccountError: error })
            stopLoading()
        }
    }, [onboarding, onboarding])
    return (
        <Provider value={{ onboarding, steps, changeIsRefresh, addInfo, refresh, completeForm, resetForm, previousState, loading, startLoading, stopLoading }}>
            <Flex h="100vh" flexDir="column" gridGap="59px" >
                <OnboardingNav />
                <Flex mx="306px" gridGap="33px" flexDirection="column" h="100%">
                    <form method="post" onSubmit={createAccount} >

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