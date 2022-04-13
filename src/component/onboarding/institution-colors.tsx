import { Button, Input, Skeleton, Flex, Text, VStack } from "@chakra-ui/react";
import _ from "lodash";
import { range } from "lodash";
import router from "next/router";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { OnboardingCard } from ".";
import { PickerIcon } from "../../constants";
import { validateHexColor } from "../../lib";
import { Onboarding, tenantAdmin, InstitutionColorInfo, Step } from "../../models";
import { OnboardingContext } from "../../providers";
import { AnimatedText } from "../framer";
interface InstitutionColorsProps {
    step: number
}
const InstitutionColors:React.FC<InstitutionColorsProps> = (props: InstitutionColorsProps) => {
    
    const { steps, onboarding, addInfo, resetForm, previousState, loading } = useContext(OnboardingContext)
    const [canNotSubmit, setCanNotSubmit] = useState<boolean>()
    const headerColorRef = useRef<HTMLInputElement>(null)
    const sidebarColourRef = useRef<HTMLInputElement>(null)
    const buttonColorRef = useRef<HTMLInputElement>(null)
    const [validation, setValidation] = useState<string[]>()

    const addInstitutionColorInfo = <T extends HTMLElement & { name: string }, U>(ele: T, value: U) => {
        addInfo("institutionColorInfo", ele.name as keyof InstitutionColorInfo, value)
    }
    function setInitTialColorProps() {
        resetForm("institutionColorInfo", {
            headerColor: "#C8D2D6",
            buttonColor: "#AAB7C6",
            sidebarColour: "#E1E6ED",
            completed: true
        })
    }
    function setHeaderColor(e: React.FormEvent<HTMLInputElement>) {

        e.stopPropagation()
        addInfo("institutionColorInfo", "headerColor", (e.target as HTMLInputElement).value)
    }
    function setButtonColor(e: React.FormEvent<HTMLInputElement>) {
        e.stopPropagation()
        addInfo("institutionColorInfo", "buttonColor", (e.target as HTMLInputElement).value)
    }

    function setsidebarColour(e: React.FormEvent<HTMLInputElement>) {

        e.stopPropagation()
        addInfo("institutionColorInfo", "sidebarColour", (e.target as HTMLInputElement).value)
    }

    useEffect(() => {
        if (typeof onboarding !== "undefined" && typeof steps !== "undefined" && typeof props.step !== "undefined") {
          
            let step = steps[props.step]
            if (props.step - 1 > -1) {
                step = steps[props.step - 1]
            }
            if ((onboarding[step.key as keyof Onboarding] as tenantAdmin).completed === false) {
                previousState()
                router.push(step.url)
            }

            if (typeof onboarding?.institutionColorInfo !== "undefined") {
                if (["headerColor", "buttonColor", "sidebarColour"].filter(x => onboarding?.institutionColorInfo[x as keyof InstitutionColorInfo] === "").length > 0) {

                    setInitTialColorProps()
                }
                setCanNotSubmit(false)
            }
        }
    }, [steps])

    useEffect(() => {
        setValidation(["headerColor", "sidebarColour", "buttonColor"].map(x => {
            const value = (onboarding?.institutionColorInfo as InstitutionColorInfo)[x as keyof InstitutionColorInfo]
            if (value === "") {
                return "This field cannot be empty"
            } else if (!validateHexColor(value as string)) {
                return "This hexcode is invalid"
            }
            return ""
        }))
    }, [onboarding?.institutionColorInfo])

    const addData = useCallback((e: React.FormEvent<HTMLInputElement | HTMLSelectElement> | Event) => {
        if (typeof e.stopPropagation !== "undefined")
            e.stopPropagation()
      
        const ele = (e.target as HTMLInputElement | HTMLSelectElement)
        // setField(ele.name as keyof SuperAdminInfo)
        const value = ele.value.toString()
        addInstitutionColorInfo(ele, value)
    }, [onboarding?.institutionColorInfo])

    const cardTitle = <Flex flexDir="column" gap="5px">
        <AnimatedText variant="card-header" size="page-header" >Institution Colors</AnimatedText>
        <AnimatedText color="muted-text">Select the colour scheme for the institution’s dashboard. Choose a colour for the header, CTAs and accents.</AnimatedText>
        <AnimatedText color="muted-text" textAlign="left">Pick from the small Pills beside the Color codes below to show the color picker or type to change the Hex codes on each box beloe to set your app color </AnimatedText>
                    
    </Flex>
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
        <Button type="submit" variant="primary-button" px="115px" py="8px" isDisabled={typeof canNotSubmit !== "undefined" ? canNotSubmit : true} isLoading={loading.isLoading} loadingText={loading.text}>Create Account</Button>
    </Flex>
    return (
        <OnboardingCard cardTitle={cardTitle} cardFooter={cardFooter}>
            <Flex flexWrap={"wrap"} gap="15px" w={"fit-content"} justify="space-around">
                <Flex w="fit-content" h="200px" flexDir="column" bgColor={"#F3F5F6"} gap="16px" borderRadius="6px">
                    <Skeleton speed={0} w="100%" h="26px" bgColor={onboarding?.institutionColorInfo?.headerColor} />
                    <Flex flexDir="column" gap="29px" pl="26px" pr="20px">
                        <Flex gap="19px">
                            <Flex flexDir="column" gap="5px">
                                {range(0, 3).map((x) => <Skeleton key={x} speed={0} bgColor={onboarding?.institutionColorInfo?.sidebarColour} w="92px" h="13px" borderRadius="8px" />)}
                            </Flex>
                            <Flex flexDir="column" gap="5px">
                                {range(0, 4).map((x) => <Skeleton key={x} speed={0} w="289px" bgColor="#E1E6ED" h="14px" borderRadius="8px" />)}
                            </Flex>
                        </Flex>
                        <Skeleton w="154px" h="53px" speed={0} alignSelf="flex-end" bgColor={onboarding?.institutionColorInfo?.buttonColor} borderRadius="8px" />
                    </Flex>
                </Flex>
                <VStack spacing='8px'>
                    <Flex bgColor="brand.muted-background" border={(typeof validation !== "undefined" && validation[0] !== "") ? "1px solid red" : "unset"} borderRadius="8px" alignItems="center" px="12px" py="16px">
                        <Button bgColor={onboarding?.institutionColorInfo?.headerColor} w="40px" h="16px" borderRadius="8px" onClick={
                            () => {
                                if(headerColorRef.current){
                                    headerColorRef.current.click()
                                }
                            }
                        }>
                            <Input bgColor={headerColorRef.current?.value} visibility="hidden" ref={headerColorRef} onChange={addData} name="headerColor" type="color" w="40px" h="16px" borderRadius="8px" value={onboarding?.institutionColorInfo?.headerColor} />
                        </Button>
                        <Input placeholder="Header colour eg. #04257F" border="0" bgColor="brand.muted-background" value={onboarding?.institutionColorInfo?.headerColor} onInput={setHeaderColor} />
                        <Text>Horizontal Nav</Text>
                        <PickerIcon />
                    </Flex>
                    <AnimatedText color="red">{(typeof validation !== "undefined" && validation[0] !== "") ? validation[0] : ""}</AnimatedText>
                    <Flex bgColor="brand.muted-background" borderRadius="8px" border={(typeof validation !== "undefined" && validation[2] !== "") ? "1px solid red" : "unset"} alignItems="center" px="12px" py="16px">
                        <Button bgColor={onboarding?.institutionColorInfo?.buttonColor} w="40px" h="16px" borderRadius="8px" onClick={
                            () => {
                                if(buttonColorRef.current){
                                    buttonColorRef.current.click()
                                }
                            }
                        }>
                            <Input visibility="hidden" type="color" name="buttonColor" w="40px" ref={buttonColorRef} onChange={addData} h="16px" borderRadius="8px" value={onboarding?.institutionColorInfo?.buttonColor} />
                        </Button>
                        <Input placeholder="Buttons & links colour eg. #04257F" border="0" value={onboarding?.institutionColorInfo?.buttonColor} bgColor="brand.muted-background" onInput={setButtonColor} />
                        <Text>Button Color</Text>
                        <PickerIcon />
                    </Flex>
                    <AnimatedText color="red">{(typeof validation !== "undefined" && validation[2] !== "") ? validation[2] : ""}</AnimatedText>
                    <Flex bgColor="brand.muted-background" borderRadius="8px" border={(typeof validation !== "undefined" && validation[1] !== "") ? "1px solid red" : "unset"} alignItems="center" px="12px" py="16px">
                        <Button bgColor={onboarding?.institutionColorInfo?.sidebarColour} w="40px" h="16px" borderRadius="8px" onClick={
                            () => {
                                if( sidebarColourRef.current){
                                    sidebarColourRef.current.click()
                                }
                            }
                        }>
                            <Input visibility="hidden" ref={sidebarColourRef} name="sidebarColour" onChange={addData} type="color" w="40px" h="16px" borderRadius="8px" value={onboarding?.institutionColorInfo?.sidebarColour} />
                        </Button>
                        <Input placeholder="Side menu & accents eg. #04257F" value={onboarding?.institutionColorInfo?.sidebarColour} border="0" bgColor="brand.muted-background" onInput={setsidebarColour} />
                        <Text>sidebar Color</Text>
                        <PickerIcon />
                    </Flex>
                    <AnimatedText color="red">{(typeof validation !== "undefined" && validation[1] !== "") ? validation[1] : ""}</AnimatedText>
                </VStack>
            </Flex>
        </OnboardingCard>
    )
}

export default InstitutionColors