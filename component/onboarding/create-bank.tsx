import { Button } from "@chakra-ui/button";
import { Badge, Box, Flex, Text } from "@chakra-ui/layout";
import { FormControl, FormLabel, Input, Image, FormErrorMessage, AvatarBadge, CloseButton, useToast, useTheme } from "@chakra-ui/react";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { OnboardingCard } from ".";
import { Images, notificationMesage } from "../../constants";
import { useOnboarding } from "../../hooks";
import _ from 'lodash'
import { Tenant, InstitutionColorInfo, Loading, Onboarding, stepsProps, BankAdmin } from "../../models";
import useValidator from "../../hooks/validatoin";
import { useRouter } from "next/router";
import { OnboardingContext } from "../layouts";

interface CreateBankProps extends stepsProps {

}

export default function CreateBank(props: CreateBankProps) {
    const fileRef = useRef<HTMLInputElement>(null)
    const { steps, onboarding, addInfo, refresh, completeForm, changeIsRefresh, loading } = useContext(OnboardingContext)
    const [canNotSubmit, setCanNotSubmit] = useState<boolean>()
    const toast = useToast()
    const router = useRouter()
    // const theme  = useTheme()
    // useMemo(() => {

    // }, [steps])
    const { validation, setData, setField } = useValidator<Tenant>()
    const addData = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | Event) => {
        // debugger
        if(typeof e.stopPropagation !== "undefined")
        e.stopPropagation()
        // debugger
        const ele = (e.target as HTMLInputElement | HTMLSelectElement)
        setField(ele.id as keyof Tenant)
        let value = ""
        if (ele.id === "bankLogo") {
            let v = e as React.ChangeEvent<HTMLInputElement>
            const reader = new FileReader();
            const file = v.target.files as FileList
            // setValidation((prev ) => {
            //     const data = prev as Validation<Tenant>
            // })
            if (file.length > 0) {
                reader.readAsDataURL(file[0] as Blob)
                reader.onload = () => {
                    // debugger
                    value = reader.result?.toString() as string
                    setField(ele.id as keyof Tenant)
                    addInfo("tenant", ele.id as keyof Tenant, value)
                }
            }
        } else {
            value = ele.value.toString()
        }
        addInfo("tenant", ele.id as keyof Tenant, value)
    }, [onboarding?.tenant])

    // useEffect(() => console.log({ canNotSubmit }), [canNotSubmit])

    useEffect(() => {
        refresh("tenant", 0)
    }, [])

    useEffect(() => {
        // debugger
        setData((prev) => onboarding?.tenant as Tenant)

        if (typeof onboarding?.tenant !== "undefined") {
            // debugger
            if (Object.values(onboarding.tenant).some((val) => val as string === "")) {
                setCanNotSubmit(true)
            } else {

                setCanNotSubmit(false)
            }
        } else {
            setCanNotSubmit(true)
        }

        return () => {
            // debugger
            // if(typeof onboarding?.tenant !== "undefined") {
            //     setData( () => undefined)
            // }
        }

    }, [onboarding?.tenant])

    const createBank = useCallback((e) => {
        // debugger
        if (typeof onboarding?.tenant !== "undefined" && typeof canNotSubmit !== "undefined") {
            if (!Object.values(onboarding.tenant).some((val) => val as string === "") && !canNotSubmit) {
                toast({
                    title: notificationMesage.SuccessfulBankCreation,
                    variant: "left-accent",
                    isClosable: true,
                    status: "success"
                })
                completeForm('tenant')
                if (typeof onboarding.state !== "undefined" && typeof steps !== "undefined") {
                    if (steps.length !== (onboarding.state + 1))
                        router.push(steps[onboarding.state + 1]?.url)
                }
                // set
            } else {
                toast({
                    title: notificationMesage.CantmoveToNextForm,
                    variant: "left-accent",
                    isClosable: true,
                    status: "error"
                })
            }
        }
    }, [canNotSubmit, onboarding, steps])

    const cardTitle = <Flex><Text>Create Bank</Text></Flex>
    const cardFooter = <Flex w="100%" justifyContent="right" gridGap="20px" >
        <Button variant="muted-primary-button" px="45px" py="8px" onClick={(_e) => typeof changeIsRefresh !== "undefined" && changeIsRefresh((_prev) => true)}>Cancel</Button>
        <Button variant="primary-button" px="115px" py="8px" isDisabled={typeof canNotSubmit !== "undefined" ? canNotSubmit : true} onClick={createBank}  isLoading={loading.isLoading} loadingText={loading.text}>Next</Button>
    </Flex>
    return (
        <OnboardingCard cardTitle={cardTitle} cardFooter={cardFooter}>
            <Flex gridColumnGap="21px" gridRowGap="32px" flexWrap="wrap" >
                <FormControl isRequired id="name" flexGrow={1} width="35%" isInvalid={validation?.errors?.name !== "" && validation?.touched.name === "touched"}>
                    <FormLabel>Bank Name</FormLabel>

                    <Input placeholder="Enter Bank Name" borderRadius="4px" value={onboarding?.tenant?.name} onChange={addData} />
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                    <FormErrorMessage>{validation?.errors.name}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired id="bankId" flexGrow={1} width="35%" isInvalid={validation?.errors?.bankId !== "" && validation?.touched.bankId === "touched"}>
                    <FormLabel>Bank ID</FormLabel>
                    <Input placeholder="Enter Bank ID" borderRadius="4px" value={onboarding?.tenant?.bankId} onChange={addData} />
                    <FormErrorMessage>{validation?.errors.bankId}</FormErrorMessage>

                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                </FormControl>
                <FormControl isRequired id="bankBranch" flexGrow={1} width="35%" isInvalid={validation?.errors?.bankBranch !== "" && validation?.touched.bankBranch === "touched"}>
                    <FormLabel>Bank Branch</FormLabel>

                    <Input placeholder="Enter Bank Branch" borderRadius="4px" value={onboarding?.tenant?.bankBranch} onChange={addData} />
                    <FormErrorMessage>{validation?.errors.bankBranch}</FormErrorMessage>
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                </FormControl>
                <FormControl isRequired id="bankLocation" flexGrow={1} width="35%" isInvalid={validation?.errors?.bankLocation !== "" && validation?.touched.bankLocation === "touched"}>
                    <FormLabel>Bank Locatoin</FormLabel>
                    <Input placeholder="Enter Bank Location" borderRadius="4px" value={onboarding?.tenant?.bankLocation} onChange={addData} />
                    <FormErrorMessage>{validation?.errors.bankLocation}</FormErrorMessage>

                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                </FormControl>
                <FormControl isRequired id="bankAddress" flexGrow={2} width="100%" isInvalid={validation?.errors?.bankAddress !== "" && validation?.touched.bankAddress === "touched"}>
                    <FormLabel>Bank Address</FormLabel>
                    <Input placeholder="Enter Bank Address" borderRadius="4px" value={onboarding?.tenant?.bankAddress} onChange={addData} />
                    <FormErrorMessage>{validation?.errors.bankAddress}</FormErrorMessage>

                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                </FormControl>
                <FormControl isRequired id="bankLogo" width="15%" flexGrow={1} isInvalid={validation?.errors?.bankLogo !== "" && validation?.touched.bankLogo === "touched"}>
                    <FormLabel>Upload a Bank Logo</FormLabel>
                    <Input placeholder="Enter Bank Address" ref={fileRef} borderRadius="4px" type="file" sx={{
                        display: "none"
                    }} border="dotted" onChange={addData} />
                    <Button border="1px dashed" borderColor="brand.mutext-text" w="100%" bgColor="white" px="70px" py="9px" onClick={() => {
                        fileRef.current?.click()
                    }}>
                        <Flex gridGap="29px">
                            <Image src={`${Images.imageUpload}`} h="46px" w="47px" />
                            <Flex flexDir="column" gridGap="4px" justifyContent="center">
                                <Text color="brand.muted-text" size="dropdown-text">Browse File</Text>
                                <Text color="brand.muted-text" size="tiny-text">File format: JPG, PNG</Text>
                            </Flex>
                        </Flex>
                    </Button>
                    <FormErrorMessage>{validation?.errors.bankLogo}</FormErrorMessage>

                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                </FormControl>
                <FormControl id="bankLogo" w="25%" flexGrow={1} >
                    <Box w="fit-content">
                        {onboarding?.tenant?.bankLogo !== "" &&

                            <><Badge pos="absolute" borderRadius="full"><CloseButton onClick={(e) => {
                                // debugger
                                const s = new Event('change');
                                (fileRef.current as HTMLInputElement).value = ""
                                fileRef.current?.addEventListener('change', addData)
                                fileRef.current?.dispatchEvent(s)
                            }} /></Badge>
                                <Image src={onboarding?.tenant?.bankLogo} h="127px" /></>}
                    </Box>
                </FormControl>
            </Flex>
        </OnboardingCard>
    )
}