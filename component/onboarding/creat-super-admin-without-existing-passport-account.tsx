import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import { FormControl, FormLabel, Input, FormErrorMessage, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import _ from "lodash";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {OnboardingCard} from ".";
import useValidator from "../../hooks/validatoin";
import { SuperAdminInfo, Loading, Onboarding } from "../../models";
import { OnboardingContext } from "../layouts";
import createBank from "./create-bank";

export default function CreateSuperAdminWithoutExistingSuperAdminAccount(_props:any) {
    const { steps, onboarding, changeOnboarding, changeIsRefresh } = useContext(OnboardingContext)
    const [canNotSubmit, setCanNotSubmit] = useState<boolean>()
    const [loading, setLoading] = useState<Loading>()
    const toast = useToast()
    const router = useRouter()

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>()
    
    const { validation, setData, setField } = useValidator<SuperAdminInfo>()



    const addData = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | Event) => {
        e.stopPropagation()
        // debugger
        const ele = (e.target as HTMLInputElement | HTMLSelectElement)
        setField(ele.id as keyof SuperAdminInfo)
        let value = ""
        if (ele.id === "bankLogo") {
            let v = e as React.ChangeEvent<HTMLInputElement>
            const reader = new FileReader();
            const file = v.target.files as FileList
            // setValidation((prev ) => {
            //     const data = prev as Validation<superAdminInfo>
            // })
            if (file.length > 0) {
                reader.readAsDataURL(file[0] as Blob)
                reader.onload = () => {
                    // debugger
                    value = reader.result?.toString() as string
                    typeof changeOnboarding !== "undefined" && changeOnboarding(prev => {

                        const data: Onboarding = _.clone(prev)
                        const returnedData: Onboarding = {
                            ...data,
                            superAdminInfo: {
                                ...data.superAdminInfo,
                                [ele.id]: value
                            } as SuperAdminInfo
                        }
                        return returnedData
                    })
                }
            } else {
                typeof changeOnboarding !== "undefined" && changeOnboarding(prev => {

                    const data: Onboarding = _.clone(prev)
                    const returnedData: Onboarding = {
                        ...data,
                        superAdminInfo: {
                            ...data.superAdminInfo,
                            [ele.id]: value
                        } as SuperAdminInfo
                    }
                    return returnedData
                })
            }
        } else {
            value = ele.value.toString()
            typeof changeOnboarding !== "undefined" && changeOnboarding(prev => {

                const data: Onboarding = _.clone(prev)
                const returnedData: Onboarding = {
                    ...data,
                    superAdminInfo: {
                        ...data.superAdminInfo,
                        [ele.id]: value
                    } as SuperAdminInfo
                }
                return returnedData
            })
        }
    }, [onboarding?.superAdminInfo])

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

    useEffect(() => {
        // debugger
        setData( (prev) => onboarding?.superAdminInfo as SuperAdminInfo)

        if (typeof onboarding?.superAdminInfo !== "undefined") {
            // debugger
            if (Object.values(onboarding.superAdminInfo).some((val) => val as string === "" )) {
                setCanNotSubmit(true)
            } else {

                setCanNotSubmit(false)
            }
        } else {
            setCanNotSubmit(true)
        }

        return () => {
            // debugger
            // if(typeof onboarding?.superAdminInfo !== "undefined") {
            //     setData( () => undefined)
            // }
        }
        
    }, [onboarding?.superAdminInfo])
    const createSuperAdmin = useCallback((e) => {
        // debugger
        if (typeof onboarding?.superAdminInfo !== "undefined" && typeof canNotSubmit !=="undefined") {
            if (!Object.values(onboarding.superAdminInfo).some((val) => val as string === "") && !canNotSubmit) {
                toast({
                    title: "Super Admin Creattion successful",
                    variant: "left-accent",
                    isClosable: true,
                    status: "success"
                })
                typeof changeOnboarding !== "undefined" && changeOnboarding(prev => (
                    {
                        ...prev,
                        state: (prev.state as number) + 1,
                        superAdminInfo: {
                            ...prev.superAdminInfo as SuperAdminInfo,
                            completed: true
                        }
                    }))
                    if(typeof onboarding.state !== "undefined" && typeof steps !== "undefined") {
                        if(steps.length !== (onboarding.state + 1))
                        router.push(steps[onboarding.state+1]?.url)
                    }
                // set
            } else {
                toast({
                    title: "Can't move on to the next form",
                    variant: "left-accent",
                    isClosable: true,
                    status: "error"
                })
            }
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

                    <Input placeholder="Jane" borderRadius="4px" value={onboarding?.superAdminInfo?.firstName} onChange={addData} readOnly />
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                    <FormErrorMessage>{validation?.errors.firstName}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired id="lastName" flexGrow={1} width="35%" isInvalid={validation?.errors?.lastName !== "" && validation?.touched.lastName === "touched"}>
                    <FormLabel>Last name</FormLabel>
                    <Input placeholder="Doe" borderRadius="4px" value={onboarding?.superAdminInfo?.lastName} onChange={addData} />
                    <FormErrorMessage>{validation?.errors.lastName}</FormErrorMessage>

                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                </FormControl>
                <FormControl isRequired id="emailAddress" flexGrow={1} width="35%" isInvalid={validation?.errors?.emailAddress !== "" && validation?.touched.emailAddress === "touched"}>
                    <FormLabel>Email Address</FormLabel>

                    <Input placeholder="janedoe@gmail.com" borderRadius="4px" value={onboarding?.superAdminInfo?.emailAddress} onChange={addData} />
                    <FormErrorMessage>{validation?.errors.emailAddress}</FormErrorMessage>
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                </FormControl>
                <FormControl isRequired id="phoneNumber" flexGrow={1} width="35%" isInvalid={validation?.errors?.phoneNumber !== "" && validation?.touched.phoneNumber === "touched"}>
                    <FormLabel>Phone Number</FormLabel>
                    <Input placeholder="Enter Phone no" borderRadius="4px" value={onboarding?.superAdminInfo?.phoneNumber} onChange={addData} />
                    <FormErrorMessage>{validation?.errors.phoneNumber}</FormErrorMessage>

                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                </FormControl>
            </Flex>
        
    </OnboardingCard>)
}