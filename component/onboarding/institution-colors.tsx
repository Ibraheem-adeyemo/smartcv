import { Flex, Text, VStack } from "@chakra-ui/layout";
import { Button, Input, InputGroup, InputLeftElement, InputRightElement, Skeleton } from "@chakra-ui/react";
import { range } from "lodash";
import router from "next/router";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { OnboardingCard } from ".";
import { PickerIcon } from "../../constants";
import { Onboarding, BankInfo, SuperAdminInfo } from "../../models";
import { OnboardingContext } from "../layouts";
import createBank from "./create-bank";

export default function InstitutionCOlors(props: any) {
    const { steps, onboarding, changeOnboarding } = useContext(OnboardingContext)
    const [canNotSubmit, setCanNotSubmit] = useState<boolean>()
    const headerColorRef = useRef<HTMLInputElement>(null)
    const [headerColor, setHeaderColor] = useState<string>("#C8D2D")
    const sidbarColorRef = useRef<HTMLInputElement>(null)
    const [sidebarColor, setSidbarColor] = useState<string>("#E1E6ED")
    const buttonColorRef = useRef<HTMLInputElement>(null)
    const [buttonColor, setButtonColor] = useState<string>("#AAB7C6")
    useEffect(() => {
        if (typeof onboarding !== "undefined" && typeof steps !== "undefined" && typeof props.step !== "undefined") {
            // debugger
            let step = steps[props.step]
            if (props.step - 1 > -1) {
                step = steps[props.step - 1]
            }
            if ((onboarding[step.key as keyof Onboarding] as SuperAdminInfo).completed === false) {
                typeof changeOnboarding !== "undefined" && changeOnboarding((prev) => ({
                    ...prev,
                    state: (prev.state as number) - 1
                }))
                router.push(step.url)
            }
        }
    }, [steps])

    const createInstitutionCOlor = useCallback((e) => {

    }, [])

    const cardTitle = <Flex flexDir="column" gridGap="5px">
        <Text variant="card-header" size="page-header" >Institution Colors</Text>
        <Text color="muted-text">Select the colour scheme for the institution’s dashboard. Choose a colour for the header, CTAs and accents.</Text>
    </Flex>
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
        <Button variant="primary-button" px="115px" py="8px" isDisabled={typeof canNotSubmit !== "undefined" ? canNotSubmit : true} onClick={createInstitutionCOlor}>Next</Button>
    </Flex>
    return (
        <OnboardingCard cardTitle={cardTitle} cardFooter={cardFooter}>
            <Flex flexDir="column" gridGap="25px" w={"475px"}>
                <Flex w="100%" h="262px" flexDir="column" bgColor={"#F3F5F6"} gridGap="26px" borderRadius="6px">
                    <Skeleton speed={0} w="100%" h="26px" bgColor={headerColor} />
                    <Flex flexDir="column" gridGap="39px" pl="26px" pr="20px">
                        <Flex gridGap="29px">
                            <Flex flexDir="column" gridGap="13px">
                                {range(0, 3).map(() => <Skeleton speed={0} bgColor={sidebarColor} w="92px" h="13px" borderRadius="8px" />)}
                            </Flex>
                            <Flex flexDir="column" gridGap="13px">
                                {range(0, 4).map(() => <Skeleton speed={0} w="289px" bgColor="#E1E6ED" h="14px" borderRadius="8px" />)}
                            </Flex>
                        </Flex>
                        <Skeleton w="154px" h="53px" speed={0} alignSelf="flex-end" bgColor={buttonColor} borderRadius="8px" />
                    </Flex>
                </Flex>
                <VStack spacing='8px'>
                    <Text color="muted-text" textAlign="left" w="100%">Enter the hex code or use the colour picker</Text>
                    <Flex bgColor="brand.muted-background" borderRadius="8px" w="100%" alignItems="center" px="12px" py="16px">
                        <Button bgColor={headerColor} w="40px" h="16px" borderRadius="8px" onClick={
                            () => {
                                headerColorRef.current?.click()
                            }
                        }>
                            <Input bgColor={headerColorRef.current?.value} visibility="hidden" ref={headerColorRef} onChange={(e) => {
                                setHeaderColor(e.target.value)
                            }} type="color" w="40px" h="16px" borderRadius="8px" value={headerColor} />
                        </Button>
                        <Input placeholder="Header colour eg. #04257F" border="0" bgColor="brand.muted-background" value={headerColor} />
                        <PickerIcon />
                    </Flex>
                    <Flex bgColor="brand.muted-background" borderRadius="8px" w="100%" alignItems="center" px="12px" py="16px">
                        <Button bgColor={buttonColor} w="40px" h="16px" borderRadius="8px" onClick={
                            () => {
                                buttonColorRef.current?.click()
                            }
                        }>
                            <Input visibility="hidden" type="color" w="40px" ref={buttonColorRef} onChange={(e) => {
                                setButtonColor(e.target.value)
                            }} h="16px" borderRadius="8px" value={buttonColor} />
                        </Button>
                        <Input placeholder="Buttons & links colour eg. #04257F" border="0" value={buttonColor} bgColor="brand.muted-background" />
                        <PickerIcon />
                    </Flex>
                    <Flex bgColor="brand.muted-background" borderRadius="8px" w="100%" alignItems="center" px="12px" py="16px">
                        <Button bgColor={sidebarColor} w="40px" h="16px" borderRadius="8px" onClick={
                            () => {
                                sidbarColorRef.current?.click()
                            }
                        }>
                            <Input visibility="hidden" ref={sidbarColorRef} onChange={(e) => {
                                setSidbarColor(e.target.value)
                            }} type="color" w="40px" h="16px" borderRadius="8px" value={sidebarColor} />
                        </Button>
                        <Input placeholder="Side menu & accents eg. #04257F" value={sidebarColor} border="0" bgColor="brand.muted-background" />
                        <PickerIcon />
                    </Flex>
                </VStack>
            </Flex>
        </OnboardingCard>
    )
}