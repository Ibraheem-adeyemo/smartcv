import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from "@chakra-ui/accordion";
import { Flex, Text } from "@chakra-ui/layout";
import { Avatar, useToast } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { TickIcon } from "../../constants";
import { BankInfo, Onboarding, stepsProps, SuperAdminInfo } from "../../models";
import { OnboardingContext } from "../layouts";

interface CreateSuperAdminProps extends stepsProps {

}

const CreateSuperAdminWithExistingSuperAdminAccount = dynamic(() => import('./creat-super-admin-with-existing-passport-account'))
const CreateSuperAdminWithoutExistingSuperAdminAccount = dynamic(() => import('./creat-super-admin-without-existing-passport-account'))
const SigninWithPassport = dynamic(() => import('./signin-with-passport'))



export default function CreateSuperAdmin(props: CreateSuperAdminProps) {
    
    const { steps, onboarding, addInfo, refresh, completeForm, resetForm, previousState } = useContext(OnboardingContext)
    const router = useRouter()
    const [authenticatedUser, setAuthenticatedUser] = useState<SuperAdminInfo>()
    const [accordionindex, setAccordionindex] = useState<number>()
    const [openModal, setOpenModal] = useState<boolean>()
    const toast = useToast()
    
    const setUserAuthority = (user: SuperAdminInfo) => {
        // debugger
        // setAuthenticatedUser(user)
        onCloseModal()
        resetForm("superAdminInfo", user)
        toast({
            title: "Your account has been verified",
            status: "success",
            variant: "left-accent",
            isClosable: true
        })
    }
    const onCloseModal = () => {
        // debbuger
        setOpenModal(false)
    }

    useEffect(() => {
        refresh("superAdminInfo", 1)
    }, [])
    useEffect(() => {
        if (typeof onboarding?.superAdminInfo !== "undefined") {
            if (onboarding.superAdminInfo.access_token !== "") {
                setAccordionindex(0)
            } else if(onboarding.superAdminInfo.confirmPassword !== "") {
                setAccordionindex(1)
            }
        } else {

            setAccordionindex(-1)
        }
    }, [onboarding?.superAdminInfo])
    useEffect(() => {
        if (typeof onboarding !== "undefined" && typeof steps !== "undefined" && typeof props.step !== "undefined") {
            // debugger
            let step = steps[props.step]
            if (props.step - 1 > -1) {
                step = steps[props.step - 1]
            }
            if ((onboarding[step.key as keyof Onboarding] as BankInfo).completed === false) {
                previousState()
                router.push(step.url)
            }
        }
    }, [steps])

    useEffect(() => {
        if (typeof authenticatedUser !== "undefined") {
            if (!openModal && Object.values(authenticatedUser).length === 0) {
                setAccordionindex(-1)
            }
        } else {
            if (!openModal) {
                setAccordionindex(-1)
            }
        }
    }, [openModal])

    return (
        <>
            <Accordion d="flex" flexDir="column" gridGap="24px" w="100%" index={accordionindex} onChange={(n) => setAccordionindex(n as number)}>
                <AccordionItem w="100%" bgColor="white">
                    {({ isExpanded }) => {
                        return <>
                            <AccordionButton onClick={() => setOpenModal(() => isExpanded ? false : true)}>
                                <Flex gridGap="17px" alignItems="center" justifyContent="flex-start" w="100%">
                                    {isExpanded ? (
                                        <Avatar boxSize="26px" bgColor="brand.primary-blue" icon={<TickIcon color="white" />}></Avatar>
                                    ) : (
                                        <Avatar boxSize="26px" showBorder borderColor="var(--chakra-colors-brand-muted)" name=" " bgColor="white"></Avatar>
                                    )}
                                    <Text textAlign="right" variant="card-header">
                                        Create super admin with an exisiting Interswitch Passport account
                                    </Text>
                                </Flex>
                            </AccordionButton>
                            <AccordionPanel>
                                {accordionindex === 0 && <CreateSuperAdminWithExistingSuperAdminAccount />}
                                {accordionindex === 1 && <></>}
                            </AccordionPanel>
                        </>
                    }}
                </AccordionItem>

                <AccordionItem w="100%" bgColor="white">
                    {({ isExpanded }) => (
                        <>
                            <AccordionButton w="100%">
                                <Flex gridGap="17px" alignItems="center" justifyContent="flex-start" w="100%">
                                    {isExpanded ? (
                                        <Avatar boxSize="26px" bgColor="brand.primary-blue" icon={<TickIcon color="white" />}></Avatar>
                                    ) : (
                                        <Avatar boxSize="26px" showBorder borderColor="var(--chakra-colors-brand-muted)" name=" " bgColor="white"></Avatar>
                                    )}
                                    <Text textAlign="right" variant="card-header">
                                        Create super admin with a new account
                                    </Text>
                                </Flex>
                            </AccordionButton>
                            <AccordionPanel>

                                {accordionindex === 1 && <CreateSuperAdminWithoutExistingSuperAdminAccount />}
                                {accordionindex === 0 && <></>}
                            </AccordionPanel>
                        </>
                    )}
                </AccordionItem>
            </Accordion>
            { openModal && <SigninWithPassport openModal={openModal as boolean} onCloseModal={onCloseModal} setUserAuthority={setUserAuthority} />}
        </>
    )
}