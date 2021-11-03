import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import { FormControl, FormLabel, Input, FormErrorMessage, Popover, PopoverArrow, PopoverBody, Text, PopoverContent, PopoverHeader, PopoverTrigger, forwardRef, Avatar, FormHelperText } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import _ from "lodash";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { OnboardingCard } from ".";
import useValidator from "../../hooks/validatoin";
import { SuperAdminInfo, Loading, Onboarding } from "../../models";
import { OnboardingContext } from "../layouts";
import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import { TickIcon } from "../../constants";
import { comparePassword, validateEmail, validateLowercase, validateNumber, validateUppercase } from "../../lib";

interface PasswordChecker { checker: string, status: boolean, text: string }
const MobleNoInput = forwardRef((props, ref) => {
    return <Input as={PhoneInput} defaultCountry="NG" {...props} ref={ref} />
})
export default function CreateSuperAdminWithoutExistingSuperAdminAccount(_props: any) {
    const numberRef = useRef<HTMLInputElement>(null)
    const passRef = useRef<HTMLInputElement>(null)
    const { steps, onboarding, changeOnboarding, changeIsRefresh } = useContext(OnboardingContext)
    const [canNotSubmit, setCanNotSubmit] = useState<boolean>()
    const [loading, setLoading] = useState<Loading>()
    const toast = useToast()
    const router = useRouter()
    const [isOpenPopOver, setIsOpenPopOver] = useState(false)
    const openPopOver = () => setIsOpenPopOver(true)
    const closePopOver = () => setIsOpenPopOver(false)

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>()

    const { validation, setData, setField } = useValidator<SuperAdminInfo>()

    const [passC, setPassC] = useState<PasswordChecker[]>()
    const [otherValidations, setOtherValidations] = useState<boolean>()

    useEffect(() => {
        if (typeof passC === "undefined") {
            const a = [
                {
                    checker: "uppercase",
                    status: false,
                    text: "Uppercase letter"
                }, {
                    checker: "lowercase",
                    status: false,
                    text: "Lowercase letter"
                }, {
                    checker: "number",
                    status: false,
                    text: "Number letter"
                }, {
                    checker: "eightminimum",
                    status: false,
                    text: "Minimum of 8 characters"
                }
            ]
            if(typeof onboarding?.superAdminInfo !== "undefined") {
                debugger
                if(onboarding.superAdminInfo.password !== "") {
                   const b = a.map((x, i) => {
                    switch (x.checker) {
                        case "uppercase":
                            return {
                                ...x,
                                status: validateUppercase(onboarding.superAdminInfo?.password as string)
                            }

                        case "lowercase":
                            return {
                                ...x,
                                status: validateLowercase(onboarding.superAdminInfo?.password as string)
                            }
                        case "number":
                            return {
                                ...x,
                                status: validateNumber(onboarding.superAdminInfo?.password as string)
                            }
                        case "eightminimum":
                            return {
                                ...x,
                                status: (onboarding.superAdminInfo?.password as string).length > 7
                            }
                            default:
                            return x
                    }
                   }) 
                   
                   setPassC(b)
                }else {
                    debugger
                    setPassC(a)
                }
            } else {
                setPassC(a)
            }
        } 
    }, [passC])


    const addData = useCallback((e: React.FormEvent<HTMLInputElement | HTMLSelectElement> | Event) => {
        if (typeof e.stopPropagation !== "undefined")
            e.stopPropagation()
        // debugger
        const ele = (e.target as HTMLInputElement | HTMLSelectElement)
        setField(ele.name as keyof SuperAdminInfo)
        const value = ele.value.toString()
        // debugger
        if (ele.name === "password") {
            // debugger
            // ele.focus()
        }
        typeof changeOnboarding !== "undefined" && changeOnboarding(prev => {
            // debugger
            const data: Onboarding = _.clone(prev)
            const returnedData: Onboarding = {
                ...data,
                superAdminInfo: {
                    ...data.superAdminInfo,
                    [ele.name]: value
                } as SuperAdminInfo
            }
            return returnedData
        })

    }, [onboarding?.superAdminInfo])

    // useEffect(() => console.log({ canNotSubmit }), [canNotSubmit])

    useEffect(() => {
        typeof changeOnboarding !== "undefined" && changeOnboarding(prev => ({
            ...prev,
            state: 1,
            superAdminInfo: {
                ...prev.superAdminInfo as SuperAdminInfo,
                completed: false
            }
        }))
    }, [])

    useEffect(() => {
        // debugger
        setData((prev) => onboarding?.superAdminInfo as SuperAdminInfo)
        if (typeof onboarding?.superAdminInfo !== "undefined") {
            debugger
            setOtherValidations(prev => {
                debugger
                const pWordCharacterValidations = ((passC as PasswordChecker[])?.filter(x => !(x?.status as boolean)).length) > 0
                const emailValidation = !validateEmail(onboarding?.superAdminInfo?.email as string)
                const mobileNoValidation = !isValidPhoneNumber(onboarding?.superAdminInfo?.mobileNo as string)
                const pwordCompare = !comparePassword(onboarding?.superAdminInfo?.confirmPassword as string, onboarding?.superAdminInfo?.password as string)
                const isEmpty = ["firstName", "lastName", "mobileNo", "password", "email", "confrimPassword"].filter((val) => (onboarding?.superAdminInfo as SuperAdminInfo)[val as keyof SuperAdminInfo] === "").length > 0
                return pWordCharacterValidations || emailValidation || mobileNoValidation || pwordCompare || isEmpty
            })
            if(onboarding.superAdminInfo.access_token !== "") {
                typeof changeOnboarding !== "undefined" && changeOnboarding(prev => ({
                    ...prev,
                    state: 1,
                    superAdminInfo: {
                        firstName:"",
                        lastName:"",
                        access_token:"",
                        mobileNo:"",
                        email:"",
                        password:"",
                        confirmPassword:"",
                        completed: false
                    }
                }))
            }
        }
        return () => {
            // debugger
            // if(typeof onboarding?.superAdminInfo !== "undefined") {
            //     setData( () => undefined)
            // }
        }

    }, [onboarding?.superAdminInfo])
    useEffect(() => {
        debugger
        if (typeof otherValidations !== "undefined") {
            // debugger
            if (otherValidations) {
                setCanNotSubmit(true)
            } else {

                setCanNotSubmit(false)
            }
        } else {
            setCanNotSubmit(true)
        }
    }, [otherValidations])
    const createSuperAdmin = useCallback((e) => {
        // debugger
        if (typeof otherValidations !== "undefined" && typeof canNotSubmit !== "undefined") {
            if (!otherValidations && !canNotSubmit) {
                toast({
                    title: "Super Admin Creation successful",
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
                if (typeof onboarding?.state !== "undefined" && typeof steps !== "undefined") {
                    if (steps.length !== (onboarding.state + 1))
                        router.push(steps[onboarding.state + 1]?.url)
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
    }, [canNotSubmit, onboarding?.state, onboarding?.superAdminInfo, steps])

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
        <Button variant="primary-button" px="115px" py="8px" isDisabled={typeof canNotSubmit !== "undefined" ? canNotSubmit : true} onClick={createSuperAdmin}>Next</Button>
    </Flex>
    return (<OnboardingCard cardTitle="" cardFooter={cardFooter}>

        <Flex gridColumnGap="21px" gridRowGap="32px" flexWrap="wrap" >
            <FormControl isRequired id="firstName" flexGrow={1} width="35%" isInvalid={validation?.errors?.firstName !== "" && validation?.touched.firstName === "touched"}>
                <FormLabel>First Name</FormLabel>

                <Input placeholder="Jane" name="firstName" borderRadius="4px" value={onboarding?.superAdminInfo?.firstName} onInput={addData} />
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                <FormErrorMessage>{validation?.errors.firstName}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired id="lastName" flexGrow={1} width="35%" isInvalid={validation?.errors?.lastName !== "" && validation?.touched.lastName === "touched"}>
                <FormLabel>Last name</FormLabel>
                <Input placeholder="Doe" name="lastName" borderRadius="4px" value={onboarding?.superAdminInfo?.lastName} onInput={addData} />
                <FormErrorMessage>{validation?.errors.lastName}</FormErrorMessage>

                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
            <FormControl isRequired id="email" flexGrow={1} width="35%" isInvalid={(!validateEmail(onboarding?.superAdminInfo?.email as string) || validation?.errors?.email !== "") && validation?.touched.email === "touched"}>
                <FormLabel>Email Address</FormLabel>

                <Input placeholder="janedoe@gmail.com" name="email" type="email" borderRadius="4px" value={onboarding?.superAdminInfo?.email} onInput={addData} />
                <FormErrorMessage>{validation?.errors.email}</FormErrorMessage>
                <FormErrorMessage>{!validateEmail(onboarding?.superAdminInfo?.email as string) ? "Invalid email" : ""}</FormErrorMessage>
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
            <FormControl isRequired id="mobileNo" flexGrow={1} width="35%" isInvalid={(validation?.errors?.mobileNo !== "" || !isValidPhoneNumber(onboarding?.superAdminInfo?.mobileNo as string)) && validation?.touched.mobileNo === "touched"}>
                <FormLabel>Phone Number</FormLabel>
                <MobleNoInput placeholder="Enter Phone no" name="mobileNo" borderRadius="4px" value={onboarding?.superAdminInfo?.mobileNo} ref={numberRef} onChange={(val: string) => {
                    debugger
                    setField("mobileNo" as keyof SuperAdminInfo)

                    typeof changeOnboarding !== "undefined" && changeOnboarding(prev => {
                        // debugger
                        const data: Onboarding = _.clone(prev)
                        const returnedData: Onboarding = {
                            ...data,
                            superAdminInfo: {
                                ...data.superAdminInfo,
                                ["mobileNo"]: typeof val === "undefined" ? "" : val
                            } as SuperAdminInfo
                        }
                        return returnedData
                    })
                }} />
                <FormErrorMessage>{validation?.errors.mobileNo}</FormErrorMessage>
                <FormErrorMessage>{!isValidPhoneNumber(onboarding?.superAdminInfo?.mobileNo as string) ? "Invalid number" : ""}</FormErrorMessage>

                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
            <Popover
                returnFocusOnClose={false}
                isOpen={isOpenPopOver}
                onClose={closePopOver}
                placement="left"
                closeOnBlur={false}
                initialFocusRef={passRef}
            >
                <PopoverTrigger>

                    <FormControl isRequired id="password" flexGrow={1} width="35%" isInvalid={(((passC as PasswordChecker[])?.filter(x => !(x?.status as boolean)).length > 0) || validation?.errors?.password !== "") && validation?.touched.password === "touched"}>
                        <FormLabel>Password</FormLabel>
                        <Input placeholder="Enter Password" type="password" name="password" ref={passRef} borderRadius="4px" value={onboarding?.superAdminInfo?.password}
                            onBlur={() => closePopOver()}
                            onInput={(e) => {
                                e.stopPropagation()
                                openPopOver()
                                const rules = [/[0-9]/, /[A-Z]/, /[a-z]/]
                                passC?.forEach((x, i) => {
                                    switch (x.checker) {
                                        case "uppercase":
                                            setPassC(prev => prev?.map((y, j) => y.checker === "uppercase" ? ({
                                                ...y,
                                                status: validateUppercase((e.target as HTMLInputElement).value)
                                            }) : y))

                                            break;
                                        case "lowercase":
                                            setPassC(prev => prev?.map((y, j) => y.checker === "lowercase" ? ({
                                                ...y,
                                                status: validateLowercase((e.target as HTMLInputElement).value)
                                            }) : y))
                                            break
                                        case "number":
                                            setPassC(prev => prev?.map((y, j) => y.checker === "number" ? ({
                                                ...y,
                                                status: validateNumber((e.target as HTMLInputElement).value)
                                            }) : y))
                                            break
                                        case "eightminimum":
                                            setPassC(prev => prev?.map((y, j) => y.checker === "eightminimum" ? ({
                                                ...y,
                                                status: (e.target as HTMLInputElement).value.length > 7
                                            }) : y))
                                            break;
                                    }
                                })
                                addData(e)
                                // openPopOver()
                                // var passwordOk = rules.every(function (r) { return r.test(password) });
                            }} />
                        <FormErrorMessage>{validation?.errors.password}</FormErrorMessage>

                        <FormErrorMessage> {((passC as PasswordChecker[])?.filter(x => !(x?.status as boolean)).length) > 0 ? ("Your password must be " + passC?.map(x => x.text).join(", ")) : ""}</FormErrorMessage>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent bgColor="brand.light-blue" py="25px" px="33px">
                    <PopoverHeader fontWeight="semibold"><Text variant="card-header" fontSize="18px"> Password Requirements</Text> </PopoverHeader>
                    <PopoverArrow bgColor="brand.light-blue" />
                    <PopoverBody d="flex" flexDir="column" gridGap="16.5px" alignItems="flex-start" pt="19.5px">
                        {passC?.map((x, i) => <Flex key={i} gridGap="14px" alignItems="center">{x.status ? (
                            <Avatar boxSize="18px" bgColor="brand.success" icon={<TickIcon color="white" />}></Avatar>
                        ) : (
                            <Avatar boxSize="18px" showBorder borderColor="var(--chakra-colors-brand-muted)" name=" " bgColor="brand.light-blue"></Avatar>
                        )}<Text color={x.status ? `brand.success` : `brand.muted-text`}>{x?.text}</Text></Flex>)}
                    </PopoverBody>
                </PopoverContent>
            </Popover>
            <FormControl isRequired id="confirmPassword" flexGrow={1} width="35%" isInvalid={(!comparePassword(onboarding?.superAdminInfo?.confirmPassword as string, onboarding?.superAdminInfo?.password as string) || validation?.errors.confirmPassword !== "") && validation?.touched.confirmPassword === "touched"}>
                <FormLabel>Confirm Password</FormLabel>
                <Input type="password" placeholder="Confirm Password" name="confirmPassword" borderRadius="4px" value={onboarding?.superAdminInfo?.confirmPassword} onInput={addData} />
                <FormErrorMessage>{validation?.errors.confirmPassword}</FormErrorMessage>
                <FormErrorMessage>{!comparePassword(onboarding?.superAdminInfo?.confirmPassword as string, onboarding?.superAdminInfo?.password as string) ? "Confirm password does not match with password" : ""}</FormErrorMessage>

                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
        </Flex>

    </OnboardingCard>)
}