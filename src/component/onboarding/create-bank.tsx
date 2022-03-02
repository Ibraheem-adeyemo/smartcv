import { Badge, Box, Flex, Text, Button, FormControl, FormLabel, Input, Image, FormErrorMessage, CloseButton, useToast, Select } from "@chakra-ui/react";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { OnboardingCard } from ".";
import { apiUrlsv1, Images, notificationMesage } from "../../constants";
import _ from 'lodash'
import { Tenant, stepsProps, State } from "../../models";
import useValidator from "../../hooks/validatoin";
import { useRouter } from "next/router";
import useSWR from "swr";
import { OnboardingContext } from "../../providers/onboarding-provider";

interface CreateBankProps extends stepsProps {

}

const CreateBank:React.FC<CreateBankProps> = (props: CreateBankProps) => {
    const {data:states, error} = useSWR<State[]>(apiUrlsv1.states)
    const fileRef = useRef<HTMLInputElement>(null)
    const { steps, onboarding, addInfo, refresh, completeForm, changeIsRefresh, loading } = useContext(OnboardingContext)
    const [canNotSubmit, setCanNotSubmit] = useState<boolean>()
    const toast = useToast()
    const router = useRouter()
    // const theme  = useTheme()
    // useMemo(() => {

    // }, [steps])
    const { validation, addField, inputData } = useValidator<Tenant>()
    const addData = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | Event) => {
      
        if(typeof e.stopPropagation !== "undefined")
        e.stopPropagation()
      
        const ele = (e.target as HTMLInputElement | HTMLSelectElement)
        addField(ele.id as keyof Tenant)
        let value = ""
        if (ele.id === "logo") {
            let v = e as React.ChangeEvent<HTMLInputElement>
            const reader = new FileReader();
            const file = v.target.files as FileList
            // setValidation((prev ) => {
            //     const data = prev as Validation<Tenant>
            // })
            if (file.length > 0) {
                reader.readAsDataURL(file[0] as Blob)
                reader.onload = () => {
                  
                    value = reader.result?.toString() as string
                    addField(ele.id as keyof Tenant)
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
        console.error({stateError: error})
    }, [error])

    useEffect(() => {
      

        if (typeof onboarding?.tenant !== "undefined") {
            inputData(onboarding.tenant)
          
            if (Object.values(onboarding.tenant).some((val) => val as string === "")) {
                setCanNotSubmit(true)
            } else {

                setCanNotSubmit(false)
            }
        } else {
            setCanNotSubmit(true)
        }

        return () => {
          
            // if(typeof onboarding?.tenant !== "undefined") {
            //     setData( () => undefined)
            // }
        }

    }, [onboarding?.tenant])

    const createBank = useCallback((e) => {
      
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
                    <FormErrorMessage>{validation?.errors.name}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired id="tenantCode" flexGrow={1} width="35%" isInvalid={validation?.errors?.tenantCode !== "" && validation?.touched.tenantCode === "touched"}>
                    <FormLabel>Bank ID</FormLabel>
                    <Input placeholder="Enter Bank ID" borderRadius="4px" value={onboarding?.tenant?.tenantCode} onChange={addData} />
                    <FormErrorMessage>{validation?.errors.tenantCode}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired id="branch" flexGrow={1} width="35%" isInvalid={validation?.errors?.branch !== "" && validation?.touched.branch === "touched"}>
                    <FormLabel>Bank Branch</FormLabel>

                    <Input placeholder="Enter Bank Branch" borderRadius="4px" value={onboarding?.tenant?.branch} onChange={addData} />
                    <FormErrorMessage>{validation?.errors.branch}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired id="location" flexGrow={1} width="35%" isInvalid={validation?.errors?.location !== "" && validation?.touched.location === "touched"}>
                    <FormLabel>Bank LocatIon</FormLabel>
                    <Select borderRadius="4px" value={onboarding?.tenant?.location} onChange={addData} placeholder="Select a state">
                        {states?.map((x, i) =><option key={i} value={x.id}>{x.name}</option>)}
                    </Select>
                    <FormErrorMessage>{validation?.errors.location}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired id="address" flexGrow={2} width="100%" isInvalid={validation?.errors?.address !== "" && validation?.touched.address === "touched"}>
                    <FormLabel>Bank Address</FormLabel>
                    <Input placeholder="Enter Bank Address" borderRadius="4px" value={onboarding?.tenant?.address} onChange={addData} />
                    <FormErrorMessage>{validation?.errors.address}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired id="logo" width="15%" flexGrow={1} isInvalid={validation?.errors?.logo !== "" && validation?.touched.logo === "touched"}>
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
                    <FormErrorMessage>{validation?.errors.logo}</FormErrorMessage>
                </FormControl>
                <FormControl id="logo" w="25%" flexGrow={1} >
                    <Box w="fit-content">
                        {onboarding?.tenant?.logo !== "" &&

                            <><Badge pos="absolute" borderRadius="full"><CloseButton onClick={(e) => {
                              
                                const s = new Event('change');
                                if(fileRef.current){
                                    fileRef.current.value = ""
                                    fileRef.current.addEventListener('change', addData)
                                    fileRef.current.dispatchEvent(s)
                                }
                            }} /></Badge>
                                <Image src={onboarding?.tenant?.logo} h="127px" /></>}
                    </Box>
                </FormControl>
            </Flex>
        </OnboardingCard>
    )
}
export default CreateBank