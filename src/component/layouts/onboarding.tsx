import { Avatar, BoxProps, chakra, ChakraComponent, Divider, Flex, forwardRef, Link, Text, useToast } from "@chakra-ui/react";
import React, { FC, Fragment, useCallback, useContext, useEffect } from "react";
import { links, notificationMesage, TickIcon } from "../../constants";
import NextLink from 'next/link'
import { useRouter } from "next/router";
import { Tenant, InstitutionColorInfo, Onboarding as OnboardingModel, Step, tenantAdmin, ComponentWithChildren } from "../../models";
import { createAccountAsync } from "../../services/v1";
import { OnboardingNav } from '.'
import _ from "lodash";
import { OnboardingContext, CrossDomainOnboardingContext } from "../../providers";
interface OnboardingProps extends ComponentWithChildren {
}
const OnboardingLink = forwardRef((props, ref) => {
    const { children, ...rest } = props
    return (
        <Link textAlign="center" as={NextLink} {...rest} ref={ref}>
            <Link textAlign="center" as={"a"} {...rest}>{children}</Link>
        </Link>)
})
const Span = chakra('span', {
    // attach style props
    baseStyle: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        alignItems: "center"
    },
})
interface LoadTextHeaderProps {
    state: number,
    onboarding: OnboardingModel,
    step: Step
}

const LoadTextHeader: FC<LoadTextHeaderProps> = (props: LoadTextHeaderProps) => {
    if (props.state < (props.onboarding.state)) {
        return <Text color={`brand.primary-blue`}>{props.step.name}</Text>
    }
    else if (props.state === props.onboarding.state) {
        return <Text color={`brand.muted-blue`}>{props.step.name}</Text>
    } else {
        return <Text>{props.step.name}</Text>
    }
}

interface LoadAvatarProps {
    state: number,
    onboarding: OnboardingModel,
    step: Step
}

const LoadAvatar: FC<LoadAvatarProps> = (props: LoadAvatarProps) => {
    // let loadTab;

    if (typeof window !== "undefined") {

        if (props.state === props.onboarding?.state) {
            return <Avatar name={`${props.state + 1}`} bgColor="brand.muted-blue"></Avatar>
        } else {
            const tab = props.onboarding[props.step.key as keyof OnboardingModel] as Tenant | tenantAdmin | InstitutionColorInfo

            if (tab.completed) {
                return <Avatar bgColor="brand.primary-blue" icon={<TickIcon color="white" />}></Avatar>
            }
        }
    }
    return <Avatar name={`${props.state + 1}`} bgColor={"brand.page-header"}></Avatar>
}

const Onboarding: FC<OnboardingProps> = (props: OnboardingProps) => {
    const { cantVew, getSelectedApp, sendCreatedAccount, isOnCrossDomain } = useContext(CrossDomainOnboardingContext)
    const { steps, onboarding, startLoading, stopLoading } = useContext(OnboardingContext)
    // useEffect(() => console.log({ c: onboarding }))
    const router = useRouter()
    // console.log({ router })
    const { step } = router.query
    const toast = useToast()

    const QuestionDivider = useCallback(({ i, arr }: { i: number, arr: Step[] }) => {
        if ((i > 0 && i <= (arr.length - 1) && (onboarding?.state as number) > 0)) {
            return <Divider border="1px solid" borderColor="var(--chakra-colors-brand-muted)" w="184px" />
        }
        return <></>
    }, [onboarding?.state])

    const createAccount = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log({isOnCrossDomain})
        startLoading()
        try {
            if (typeof onboarding !== "undefined") {
                await createAccountAsync(onboarding)
                toast({
                    status: "success",
                    title: notificationMesage.SuccessfulAccountCreation,
                    isClosable: true,
                    variant: "left-accent"
                })
                debugger
                if (!isOnCrossDomain) {
                    router.push(links.onboardingSuccessPage)
                } else {
                    sendCreatedAccount(onboarding)
                }
                return;
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

            if (typeof error !== "undefined") {
                toast({
                    status: "error",
                    title: typeof error.message !== "undefined" ? error.message : error,
                    isClosable: true,
                    variant: "left-accent"
                })
            }
            // console.error({ createAccountError: error })
            stopLoading()
        }
    }, [onboarding])

    useEffect(() => {
        getSelectedApp()
    }, [])

    return (
        <Flex h="100vh" flexDir="column" gap="59px" >
            <OnboardingNav />
            <Flex mx="306px" gap="33px" flexDirection="column" h="100%">

                {!cantVew && <form method="post" onSubmit={createAccount} >

                    <Flex gap="33px" flexDirection="column">
                        <Flex sx={{
                            gap: onboarding?.state as number > 0 ? `13px` : `100px`,
                            alignItems:"center",
                            justifyContent:"space-around"
                        }} >
                            {steps && steps.map((x, i, arr) =>
                                <Fragment key={i}>
                                    <QuestionDivider i={i} arr={arr} />
                                    <OnboardingLink href={x.url}>
                                        <Span>

                                            {onboarding && <>
                                                <LoadAvatar state={i} step={x} onboarding={onboarding} />
                                                <LoadTextHeader state={i} step={x} onboarding={onboarding} />
                                            </>}
                                            <Text textAlign="center">{x.description}</Text>
                                        </Span>
                                    </OnboardingLink>
                                </Fragment>
                            )}
                            {!steps && <></>}
                        </Flex>
                        <Flex>
                            {props.children}
                        </Flex>
                    </Flex>
                </form>}
                {
                    cantVew && <Text variant="page-header">This Page is not available</Text>
                }
            </Flex>
        </Flex>
    )
}

export default Onboarding