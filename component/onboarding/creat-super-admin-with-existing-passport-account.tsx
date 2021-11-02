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
    authenticatedUser: SuperAdminInfo
}

export default function CreateSuperAdminWithExistingSuperAdminAccount(props: CreateSuperAdminWithExistingSuperAdminAccountProps) {
    const { steps, onboarding, changeOnboarding, changeIsRefresh } = useContext(OnboardingContext)
    const [canNotSubmit, setCanNotSubmit] = useState<boolean>()
    const [loading, setLoading] = useState<Loading>()
    const toast = useToast()
    const router = useRouter()
    const { validation, setData, setField } = useValidator<SuperAdminInfo>()

    useEffect(() => {
        if(typeof  props.authenticatedUser !== "undefined") {
            debugger
           typeof changeOnboarding !== "undefined" && changeOnboarding((prev) => ({
                ...prev as Onboarding,
                superAdminInfo: {
                    ...props.authenticatedUser,
                    completed: true
                }
            }))
        }
    }, [props.authenticatedUser])

    // useEffect(() => console.log({ canNotSubmit }), [canNotSubmit])

    useEffect(() => {
        typeof changeOnboarding !== "undefined" ? changeOnboarding(prev => ({
            ...prev,
            state: 1,
            superAdminInfo: {
                ...prev.superAdminInfo as SuperAdminInfo,
                completed: false
            }
        })) : ""
    }, [])

    const createSuperAdmin = useCallback((e) => {
        // debugger
        if (typeof onboarding?.superAdminInfo !== "undefined" && typeof canNotSubmit !== "undefined") {

        }
    }, [canNotSubmit, onboarding, steps])

    const cardFooter = <Flex w="100%" justifyContent="right" gridGap="20px" >
        <Button variant="muted-primary-button" px="45px" py="8px" onClick={(_e) => typeof changeIsRefresh !== "undefined" && changeIsRefresh((_prev) => true)}>Cancel</Button>
        <Button variant="primary-button" px="115px" py="8px" isDisabled={typeof canNotSubmit !== "undefined" ? canNotSubmit : true} onClick={createSuperAdmin}>Next</Button>
    </Flex>
    return (<OnboardingCard cardTitle="" cardFooter={cardFooter}>

        <Flex gridColumnGap="21px" gridRowGap="32px" flexWrap="wrap" >
            <FormControl isRequired id="firtstName" flexGrow={1} width="35%" isInvalid={validation?.errors?.firstName !== "" && validation?.touched.firstName === "touched"}>
                <FormLabel>First Name</FormLabel>

                <Input placeholder="Jane" borderRadius="4px" value={onboarding?.superAdminInfo?.firstName}  disabled={true} />
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                <FormErrorMessage>{validation?.errors.firstName}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired id="lastName" flexGrow={1} width="35%" >
                <FormLabel>Last name</FormLabel>
                <Input placeholder="Doe" borderRadius="4px" value={onboarding?.superAdminInfo?.lastName} disabled={true} />

                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
            <FormControl isRequired id="emailAddress" flexGrow={1} width="35%">
                <FormLabel>Email Address</FormLabel>

                <Input placeholder="janedoe@gmail.com" borderRadius="4px" value={onboarding?.superAdminInfo?.emailAddress} disabled={true} />
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
            <FormControl isRequired id="phoneNumber" flexGrow={1} width="35%" >
                <FormLabel>Phone Number</FormLabel>
                <Input placeholder="Enter Phone no" borderRadius="4px" value={onboarding?.superAdminInfo?.phoneNumber} disabled={true} />

                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
        </Flex>

    </OnboardingCard>)
}