import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import { FormControl, useToast, FormLabel, Input } from "@chakra-ui/react";

import _ from "lodash";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { OnboardingCard } from ".";
import { notificationMesage } from "../../constants";
import { OnboardingContext } from "../layouts";


export default function CreateSuperAdminWithExistingSuperAdminAccount() {
    const { steps, onboarding, completeForm, previousState, loading} = useContext(OnboardingContext)
    const [canNotSubmit, setCanNotSubmit] = useState<boolean>()
    const toast = useToast()
    const router = useRouter()

    useEffect(() => {
        // if(typeof onboarding?.tenantAdmin !== "undefined") {
        if (onboarding?.tenantAdmin?.access_token !== "") {

            setCanNotSubmit(false)
        } else {
            setCanNotSubmit(true)
        }
        // }

    }, [onboarding?.tenantAdmin])

    const createSuperAdmin = useCallback(() => {
        // debugger
        if (typeof onboarding?.tenantAdmin !== "undefined" && typeof canNotSubmit !== "undefined" && typeof onboarding.state !== "undefined" && typeof steps !== "undefined") {
            if (steps.length !== (onboarding.state + 1)) {
                completeForm("tenantAdmin")
                toast({
                    title: notificationMesage.SuccessfulSuperAdminCreation,
                    variant: "left-accent",
                    isClosable: true,
                    status: "success"
                })
                router.push(steps[onboarding.state + 1]?.url)
            } else {
                toast({
                    title: notificationMesage.CantmoveToNextForm,
                    variant: "left-accent",
                    isClosable: true,
                    status: "error"
                })
            }
        } else {
            toast({
                title: notificationMesage.CantmoveToNextForm,
                variant: "left-accent",
                isClosable: true,
                status: "error"
            })
        }
    }, [canNotSubmit, onboarding?.state, onboarding?.tenantAdmin, steps])

    const cardFooter = <Flex w="100%" justifyContent="right" gridGap="20px" >
        <Button variant="muted-primary-button" px="45px" py="8px" onClick={(_e) => {
            if (typeof onboarding !== "undefined" && typeof steps !== "undefined") {
                // debugger
                let step = steps[onboarding.state as number]
                if (onboarding.state as number - 1 > -1) {
                    step = steps[onboarding.state as number - 1]
                }
                previousState()
                router.push(step.url)
            }
        }}>Previous</Button>
        <Button variant="primary-button" px="115px" py="8px" isLoading={loading.isLoading} loadingText={loading.text} isDisabled={typeof canNotSubmit !== "undefined" ? canNotSubmit : true} onClick={createSuperAdmin}>Next</Button>
    </Flex>
    return (<OnboardingCard cardTitle="" cardFooter={cardFooter}>

        <Flex gridColumnGap="21px" gridRowGap="32px" flexWrap="wrap" >
            <FormControl isRequired flexGrow={1} width="35%">
                <FormLabel>First Name</FormLabel>

                <Input placeholder="Jane" borderRadius="4px" value={onboarding?.tenantAdmin?.firstName} disabled={true} />
            </FormControl>
            <FormControl isRequired flexGrow={1} width="35%" >
                <FormLabel>Last name</FormLabel>
                <Input placeholder="Doe" borderRadius="4px" value={onboarding?.tenantAdmin?.lastName} disabled={true} />

            </FormControl>
            <FormControl isRequired flexGrow={1} width="35%">
                <FormLabel>Email Address</FormLabel>

                <Input placeholder="janedoe@gmail.com" borderRadius="4px" value={onboarding?.tenantAdmin?.email} disabled={true} />
            </FormControl>
            <FormControl isRequired flexGrow={1} width="35%" >
                <FormLabel>Phone Number</FormLabel>
                <Input placeholder="Enter Phone no" borderRadius="4px" value={onboarding?.tenantAdmin?.mobileNo} disabled={true} />

            </FormControl>
        </Flex>

    </OnboardingCard>)
}