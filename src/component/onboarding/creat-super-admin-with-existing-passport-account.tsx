import { Button } from "@chakra-ui/button";
import { FormControl, useToast, FormLabel, Input, Flex } from "@chakra-ui/react";

import _ from "lodash";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { OnboardingCard } from ".";
import { notificationMesage } from "../../constants";
import { OnboardingContext } from "../../providers/onboarding-provider";
import { MotionFormLabel } from "../framer";


const CreateSuperAdminWithExistingSuperAdminAccount:React.FC = () => {
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

    const cardFooter = <Flex w="100%" justifyContent="right" gap="20px" >
        <Button variant="muted-primary-button" px="45px" py="8px" onClick={(_e) => {
            if (typeof onboarding !== "undefined" && typeof steps !== "undefined") {
              
                let step = steps[onboarding.state]
                if (onboarding.state - 1 > -1) {
                    step = steps[onboarding.state - 1]
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
                <MotionFormLabel>First Name</MotionFormLabel>

                <Input placeholder="Jane" borderRadius="4px" value={onboarding?.tenantAdmin?.firstName} disabled={true} />
            </FormControl>
            <FormControl isRequired flexGrow={1} width="35%" >
                <MotionFormLabel>Last name</MotionFormLabel>
                <Input placeholder="Doe" borderRadius="4px" value={onboarding?.tenantAdmin?.lastName} disabled={true} />

            </FormControl>
            <FormControl isRequired flexGrow={1} width="35%">
                <MotionFormLabel>Email Address</MotionFormLabel>

                <Input placeholder="janedoe@gmail.com" borderRadius="4px" value={onboarding?.tenantAdmin?.email} disabled={true} />
            </FormControl>
            <FormControl isRequired flexGrow={1} width="35%" >
                <MotionFormLabel>Phone Number</MotionFormLabel>
                <Input placeholder="Enter Phone no" borderRadius="4px" value={onboarding?.tenantAdmin?.mobileNo} disabled={true} />

            </FormControl>
        </Flex>

    </OnboardingCard>)
}

export default CreateSuperAdminWithExistingSuperAdminAccount