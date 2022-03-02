import { Button, Input, Skeleton, Flex, Text, VStack } from "@chakra-ui/react";
import _ from "lodash";
import { range } from "lodash";
import router from "next/router";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { OnboardingCard } from ".";
import { PickerIcon } from "../../constants";
import { validateHexColor } from "../../lib";
import { Onboarding, tenantAdmin, InstitutionColorInfo, Step } from "../../models";
import { OnboardingContext } from "../../providers/onboarding-provider";
interface InstitutionColorsProps {
    step: number
}
const InstitutionColors:React.FC<InstitutionColorsProps> = (props: InstitutionColorsProps) => {
    
    const { steps, onboarding, addInfo, resetForm, previousState, loading } = useContext(OnboardingContext)
    const [canNotSubmit, setCanNotSubmit] = useState<boolean>()
    const headerColorRef = useRef<HTMLInputElement>(null)
    const sidebarColorRef = useRef<HTMLInputElement>(null)
    const buttonColorRef = useRef<HTMLInputElement>(null)
    const [validation, setValidation] = useState<string[]>()

    const addInstitutionColorInfo = <T extends HTMLElement & { name: string }, U>(ele: T, value: U) => {
        addInfo("institutionColorInfo", ele.name as keyof InstitutionColorInfo, value)
    }
    function setInitTialColorProps() {
        resetForm("institutionColorInfo", {
            headerColor: "#C8D2D6",
            buttonColor: "#AAB7C6",
            sidebarColor: "#E1E6ED",
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

    function setSidebarColor(e: React.FormEvent<HTMLInputElement>) {

        e.stopPropagation()
        addInfo("institutionColorInfo", "sidebarColor", (e.target as HTMLInputElement).value)
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
                if (["headerColor", "buttonColor", "sidebarColor"].filter(x => onboarding?.institutionColorInfo[x as keyof InstitutionColorInfo] === "").length > 0) {

                    setInitTialColorProps()
                }
                setCanNotSubmit(false)
            }
        }
    }, [steps])

    useEffect(() => {
        setValidation(["headerColor", "sidebarColor", "buttonColor"].map(x => {
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

    const cardTitle = <Flex flexDir="column" gridGap="5px">
        <Text variant="card-header" size="page-header" >Institution Colors</Text>
        <Text color="muted-text">Select the colour scheme for the institution’s dashboard. Choose a colour for the header, CTAs and accents.</Text>
    </Flex>
    const cardFooter = <Flex w="100%" justifyContent="right" gridGap="20px" >
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
            <Flex flexDir="column" gridGap="25px" w={"475px"}>
                <Flex w="100%" h="262px" flexDir="column" bgColor={"#F3F5F6"} gridGap="26px" borderRadius="6px">
                    <Skeleton speed={0} w="100%" h="26px" bgColor={onboarding?.institutionColorInfo?.headerColor} />
                    <Flex flexDir="column" gridGap="39px" pl="26px" pr="20px">
                        <Flex gridGap="29px">
                            <Flex flexDir="column" gridGap="13px">
                                {range(0, 3).map((x) => <Skeleton key={x} speed={0} bgColor={onboarding?.institutionColorInfo?.sidebarColor} w="92px" h="13px" borderRadius="8px" />)}
                            </Flex>
                            <Flex flexDir="column" gridGap="13px">
                                {range(0, 4).map((x) => <Skeleton key={x} speed={0} w="289px" bgColor="#E1E6ED" h="14px" borderRadius="8px" />)}
                            </Flex>
                        </Flex>
                        <Skeleton w="154px" h="53px" speed={0} alignSelf="flex-end" bgColor={onboarding?.institutionColorInfo?.buttonColor} borderRadius="8px" />
                    </Flex>
                </Flex>
                <VStack spacing='8px'>
                    <Text color="muted-text" textAlign="left" w="100%">Enter the hex code or use the colour picker</Text>
                    <Flex bgColor="brand.muted-background" border={(typeof validation !== "undefined" && validation[0] !== "") ? "1px solid red" : "unset"} borderRadius="8px" w="100%" alignItems="center" px="12px" py="16px">
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
                        <PickerIcon />
                    </Flex>
                    <Text color="red">{(typeof validation !== "undefined" && validation[0] !== "") ? validation[0] : ""}</Text>
                    <Flex bgColor="brand.muted-background" borderRadius="8px" border={(typeof validation !== "undefined" && validation[2] !== "") ? "1px solid red" : "unset"} w="100%" alignItems="center" px="12px" py="16px">
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
                        <PickerIcon />
                    </Flex>
                    <Text color="red">{(typeof validation !== "undefined" && validation[2] !== "") ? validation[2] : ""}</Text>
                    <Flex bgColor="brand.muted-background" borderRadius="8px" w="100%" border={(typeof validation !== "undefined" && validation[1] !== "") ? "1px solid red" : "unset"} alignItems="center" px="12px" py="16px">
                        <Button bgColor={onboarding?.institutionColorInfo?.sidebarColor} w="40px" h="16px" borderRadius="8px" onClick={
                            () => {
                                if( sidebarColorRef.current){
                                    sidebarColorRef.current.click()
                                }
                            }
                        }>
                            <Input visibility="hidden" ref={sidebarColorRef} name="sidebarColor" onChange={addData} type="color" w="40px" h="16px" borderRadius="8px" value={onboarding?.institutionColorInfo?.sidebarColor} />
                        </Button>
                        <Input placeholder="Side menu & accents eg. #04257F" value={onboarding?.institutionColorInfo?.sidebarColor} border="0" bgColor="brand.muted-background" onInput={setSidebarColor} />
                        <PickerIcon />
                    </Flex>
                    <Text color="red">{(typeof validation !== "undefined" && validation[1] !== "") ? validation[1] : ""}</Text>
                </VStack>
            </Flex>
        </OnboardingCard>
    )
}

export default InstitutionColors