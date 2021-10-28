import { Button } from "@chakra-ui/button";
import { Flex, Text } from "@chakra-ui/layout";
import { FormControl, FormLabel, Input, Image } from "@chakra-ui/react";
import React, { useMemo, useRef, useState } from "react";
import { OnboardingCard } from ".";
import { Images } from "../../constants";
import { useOnboarding } from "../../hooks";
import _ from 'lodash'
import { BankInfo, Onboarding } from "../../models";
export default function CreateBank(props: any) {
    const fileRef = useRef<HTMLInputElement>(null)
    const { steps, onboarding, setOnboarding } = useOnboarding()
    useMemo(() => {

    }, [steps])
    const cardTitle = <Flex><Text>Create Bank</Text></Flex>
    const cardFooter = <Flex >
        <Button variant="muted-primary-button">Cancel</Button>
        <Button variant="primary-button" mx="115px" my="8px">Next</Button>
    </Flex>
    return (
        <OnboardingCard cardTitle={cardTitle} cardFooter={cardFooter}>
            <Flex gridColumnGap="21px" gridRowGap="32px" flexWrap="wrap" >
                <FormControl id="bankName" flexGrow={1} width="35%">
                    <FormLabel>Bank Name</FormLabel>

                    <Input placeholder="Enter Bank Name" borderRadius="4px" defaultValue={onboarding.bankInfo?.bankName} onInput={(e) => {
                        e.stopPropagation()
                        const value = (e.target as HTMLInputElement).value.toString()
                        setOnboarding(prev => {
                            
                            const data:Onboarding = _.clone(prev)
                            const returnedData:Onboarding = { 
                                ...data,
                                bankInfo: {
                                    ...data.bankInfo,
                                    bankName: value
                                } as BankInfo
                            }
                            return returnedData
                        })
                    }} />
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                </FormControl>
                <FormControl id="bankId" flexGrow={1} width="35%">
                    <FormLabel>Bank ID</FormLabel>
                    <Input placeholder="Enter Bank ID" borderRadius="4px" />

                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                </FormControl>
                <FormControl id="bankBranch" flexGrow={1} width="35%">
                    <FormLabel>Bank Branch</FormLabel>

                    <Input placeholder="Enter Bank Branch" borderRadius="4px" />
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                </FormControl>
                <FormControl id="bankLocation" flexGrow={1} width="35%">
                    <FormLabel>Bank Locatoin</FormLabel>
                    <Input placeholder="Enter Bank Location" borderRadius="4px" />

                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                </FormControl>
                <FormControl id="bankAddress" flexGrow={2} width="100%">
                    <FormLabel>Bank Address</FormLabel>
                    <Input placeholder="Enter Bank Address" borderRadius="4px" />

                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                </FormControl>
                <FormControl id="bankAddress" width="35%">
                    <FormLabel>Upload a Bank Logo</FormLabel>
                    <Input placeholder="Enter Bank Address" ref={fileRef} borderRadius="4px" type="file" sx={{
                        display: "none"
                    }} border="dotted" onChange={(e) => {
                        e.stopPropagation()

                        // debugger
                    }} />
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

                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                </FormControl>
            </Flex>
        </OnboardingCard>
    )
}