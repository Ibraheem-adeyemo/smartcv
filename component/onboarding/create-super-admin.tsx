import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from "@chakra-ui/accordion";
import { Flex, Text } from "@chakra-ui/layout";
import { Avatar, useToast } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { notificationMesage, TickIcon } from "../../constants";
import { Tenant, Onboarding, stepsProps, tenantAdmin } from "../../models";
import { OnboardingContext } from "../layouts";

interface CreateSuperAdminProps extends stepsProps {

}

const CreateSuperAdminWithExistingSuperAdminAccount = dynamic(() => import('./creat-super-admin-with-existing-passport-account'))
const CreateSuperAdminWithoutExistingSuperAdminAccount = dynamic(() => import('./creat-super-admin-without-existing-passport-account'))
const SigninWithPassport = dynamic(() => import('./signin-with-passport'))



const CreateSuperAdmin:React.FC<CreateSuperAdminProps> = (props: CreateSuperAdminProps) => {
    
    const { steps, onboarding, refresh, resetForm, previousState } = useContext(OnboardingContext)
    const router = useRouter()
    const [authenticatedUser] = useState<tenantAdmin>()
    const [accordionindex, setAccordionindex] = useState<number>()
    const [openModal, setOpenModal] = useState<boolean>()
    const toast = useToast()
    
    const setUserAuthority = (user: tenantAdmin) => {
        // debugger
        // setAuthenticatedUser(user)
        onCloseModal()
        resetForm("tenantAdmin", user)
        toast({
            title: notificationMesage.AccountVerified,
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
        refresh("tenantAdmin", 1)
    }, [])
    useEffect(() => {
        if (typeof onboarding?.tenantAdmin !== "undefined") {
            if (onboarding.tenantAdmin.access_token !== "") {
                setAccordionindex(0)
            } else if(onboarding.tenantAdmin.confirmPassword !== "") {
                setAccordionindex(1)
            }
        } else {

            setAccordionindex(-1)
        }
    }, [onboarding?.tenantAdmin])
    useEffect(() => {
        if (typeof onboarding !== "undefined" && typeof steps !== "undefined" && typeof props.step !== "undefined") {
            // debugger
            let step = steps[props.step]
            if (props.step - 1 > -1) {
                step = steps[props.step - 1]
            }
            if ((onboarding[step.key as keyof Onboarding] as Tenant).completed === false) {
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
                            <AccordionButton onClick={() => setOpenModal(() => isExpanded ? false : true)}  py="34px" >
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
                            <AccordionButton w="100%"  py="34px">
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

export default CreateSuperAdmin