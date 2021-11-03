import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import { FormControl, FormLabel, Input, FormErrorMessage, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import _ from "lodash";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { OnboardingCard } from ".";
import useValidator from "../../hooks/validatoin";
import { SuperAdminInfo, Loading, Onboarding } from "../../models";
import { OnboardingContext } from "../layouts";
import createBank from "./create-bank";

interface CreateSuperAdminWithExistingSuperAdminAccountProps {
    // authenticatedUser: SuperAdminInfo
}

export default function CreateSuperAdminWithExistingSuperAdminAccount(props: CreateSuperAdminWithExistingSuperAdminAccountProps) {
    const { steps, onboarding, changeOnboarding, changeIsRefresh } = useContext(OnboardingContext)
    const [canNotSubmit, setCanNotSubmit] = useState<boolean>()
    const [loading, setLoading] = useState<Loading>()
    const toast = useToast()
    const router = useRouter()

    useEffect(() => {
        // if(typeof onboarding?.superAdminInfo !== "undefined") {
        if (onboarding?.superAdminInfo?.access_token !== "") {

            setCanNotSubmit(false)
        } else {
            setCanNotSubmit(true)
        }
        // }

    }, [onboarding?.superAdminInfo])

    // useEffect(() => console.log({ canNotSubmit }), [canNotSubmit])

    // useEffect(() => {
    //     typeof changeOnboarding !== "undefined" && changeOnboarding(prev => ({
    //         ...prev,
    //         state: 1,
    //         superAdminInfo: {
    //             ...prev.superAdminInfo as SuperAdminInfo,
    //             completed: false
    //         }
    //     }))
    //     setCanNotSubmit(true)
    // }, [])

    const createSuperAdmin = useCallback((e) => {
        // debugger
        if (typeof onboarding?.superAdminInfo !== "undefined" && typeof canNotSubmit !== "undefined" && typeof onboarding.state !== "undefined" && typeof steps !== "undefined") {
            if (steps.length !== (onboarding.state + 1)) {
                typeof changeOnboarding !== "undefined" && changeOnboarding(prev => ({
                    ...prev,
                    state: prev.state as number + 1,
                    superAdminInfo: {
                        ...prev.superAdminInfo as SuperAdminInfo,
                        completed:true
                    }
                }))
                toast({
                    title: "Super Admin Creation successful",
                    variant: "left-accent",
                    isClosable: true,
                    status: "success"
                })
                router.push(steps[onboarding.state + 1]?.url)
            } else {
                toast({
                    title: "Can't move on to the next form",
                    variant: "left-accent",
                    isClosable: true,
                    status: "error"
                })
            }
        } else {
            toast({
                title: "Can't move on to the next form",
                variant: "left-accent",
                isClosable: true,
                status: "error"
            })
        }
    }, [canNotSubmit, onboarding?.state, onboarding?.superAdminInfo, steps])

    const cardFooter = <Flex w="100%" justifyContent="right" gridGap="20px" >
        <Button variant="muted-primary-button" px="45px" py="8px" onClick={(_e) => {
            if (typeof onboarding !== "undefined" && typeof steps !== "undefined") {
                // debugger
                let step = steps[onboarding.state as number]
                if (onboarding.state as number - 1 > -1) {
                    step = steps[onboarding.state as number - 1]
                }
                typeof changeOnboarding !== "undefined" && changeOnboarding((prev) => ({
                    ...prev,
                    state: (prev.state as number) - 1
                }))
                router.push(step.url)
            }
        }}>Previous</Button>
        <Button variant="primary-button" px="115px" py="8px" isDisabled={typeof canNotSubmit !== "undefined" ? canNotSubmit : true} onClick={createSuperAdmin}>Next</Button>
    </Flex>
    return (<OnboardingCard cardTitle="" cardFooter={cardFooter}>

        <Flex gridColumnGap="21px" gridRowGap="32px" flexWrap="wrap" >
            <FormControl isRequired flexGrow={1} width="35%">
                <FormLabel>First Name</FormLabel>

                <Input placeholder="Jane" borderRadius="4px" value={onboarding?.superAdminInfo?.firstName} disabled={true} />
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
            <FormControl isRequired flexGrow={1} width="35%" >
                <FormLabel>Last name</FormLabel>
                <Input placeholder="Doe" borderRadius="4px" value={onboarding?.superAdminInfo?.lastName} disabled={true} />

                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
            <FormControl isRequired flexGrow={1} width="35%">
                <FormLabel>Email Address</FormLabel>

                <Input placeholder="janedoe@gmail.com" borderRadius="4px" value={onboarding?.superAdminInfo?.email} disabled={true} />
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
            <FormControl isRequired flexGrow={1} width="35%" >
                <FormLabel>Phone Number</FormLabel>
                <Input placeholder="Enter Phone no" borderRadius="4px" value={onboarding?.superAdminInfo?.mobileNo} disabled={true} />

                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
        </Flex>

    </OnboardingCard>)
}