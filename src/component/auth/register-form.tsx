import { Text, Button, FormControl, FormLabel, Input, useToast, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { FC, useContext, useEffect, useState } from "react";
import { cookieKeys, cookiesTimeout, links, notificationMesage, sessionStorageKeys } from "../../constants";
import { setCookie } from "../../lib";
import useLoading from "../../hooks/loading";
import { getInterchangeById } from "../../services/v1";
import { AppLink } from "../app";
import { CrossDomainOnboardingContext } from "../../providers";
import { MotionBox, MotionButton, MotionFlex } from "../framer";
import { appear, staggerChildrenWithDuration, verticalPosition } from "../../animations";
import { registerFormContainerSX } from "../../sx";

const RegisterForm: FC = () => {

    const router = useRouter()
    const [interChangeId, setInterChangeId] = useState<string>()
    const toast = useToast()
    const [loading, setLoading] = useLoading()

    const { isOnCrossDomain, setInterChangeIdData, removeData, cantVew, getSelectedApp } = useContext(CrossDomainOnboardingContext)

    const getInterChangebyInterchangeId = async () => {
        try {
            // debugger
            setLoading({ isLoading: true, text: "Confirming" })
            const data = await getInterchangeById(interChangeId as string)
            if (typeof data.statusCondition !== "undefined" && typeof interChangeId !== "undefined") {
                // debugger
                setCookie(cookieKeys.interchangeId, interChangeId, cookiesTimeout.interchangeIdTimeout)
                if (isOnCrossDomain) {
                    setInterChangeIdData(interChangeId)
                }
                toast({
                    status: "success",
                    title: notificationMesage.SuccessfulLogin,
                    isClosable: true,
                    variant: "left-accent"
                })
                router.push(links.onboarding)
                return
            } else if (typeof data.statusCondition !== "undefined") {
                throw {
                    data
                }
            } else {
                throw new Error(`${notificationMesage.Oops} ${notificationMesage.AnErrorOccurred}`)
            }
        } catch (error: any) {
            // console.error({ getInterChangebyInterchangeIdError: error })

                toast({
                    status: "error",
                    title: error? error.message?error.message : error: `${notificationMesage.Oops} ${notificationMesage.AnErrorOccurred}`,
                    isClosable: true,
                    variant: "left-accent"
                })
            setLoading({ isLoading: false, text: "" })
        }
    }

    useEffect(() => {
        // debugger
        sessionStorage.removeItem(sessionStorageKeys.onboarding)
        getSelectedApp()
        removeData()
        return () => {
            // window.removeEventListener("message", readEventMsg)
        }
    }, [])
    return (
        <>
            {!cantVew && (<form method="POST" onSubmit={((e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                getInterChangebyInterchangeId()
            })}>
                <MotionFlex sx={registerFormContainerSX}
                    initial="hide"
                    animate="show"
                    variants={staggerChildrenWithDuration}
                >
                    <Text variant="card-header" size="page-header" >Register</Text>
                    <FormControl id="organizationId">
                        <FormLabel
                            sx={{
                                overflow: "hidden",
                                display: "inline-block"
                            }}>
                            <MotionBox sx={{
                                display: "inline-block"
                            }}
                                initial="hide"
                                animate="show"
                                variants={verticalPosition}>
                                Organization ID</MotionBox></FormLabel>
                        <Input placeholder="XYZ1278IO" borderRadius="4px" onInput={(e) => {
                            e.stopPropagation()
                            const ele = e.target as HTMLInputElement
                            setInterChangeId(ele.value)
                        }} />
                    </FormControl>
                    <MotionFlex flexDir="column" gap="15px" w="100%" alignItems="center"
                        variants={appear()}
                        animate="open"
                        initial="close"
                    >
                        <MotionButton isLoading={loading.isLoading} loadingText={loading.text} type="submit" variant="primary-button" sx={{
                            w: "100%",
                            py: "12px"
                        }}

                            variants={appear()}
                        >
                            Submit
                        </MotionButton>
                        {!isOnCrossDomain && <MotionBox
                            sx={{
                                overflow: "hidden",
                                display: "inline-block"
                            }}
                        >
                            <MotionBox
                                sx={{
                                    display: "inline-block"
                                }}
                                initial="hide"
                                animate="show"
                                variants={verticalPosition}
                            >
                                <AppLink href={links.login} color="brand.primary-blue" >Back to Login</AppLink>
                            </MotionBox>
                        </MotionBox>}
                    </MotionFlex>
                </MotionFlex>
            </form>)}
            {cantVew && <Flex flexDir="column" gap="36px" px="66px" bg="white" borderRadius="6px" alignItems="center" w="633px" py="36px"><Text variant="card-header" size="page-header">You can not view This page</Text></Flex>}
        </>
    )
}

export default RegisterForm