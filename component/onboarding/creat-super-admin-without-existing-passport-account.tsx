import { Button } from "@chakra-ui/button";
import { useToast, FormControl, FormLabel, Input, FormErrorMessage, Popover, PopoverBody, Text, PopoverContent, PopoverHeader, PopoverTrigger, forwardRef, Avatar, Flex, PopoverArrow } from "@chakra-ui/react";
import _ from "lodash";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { OnboardingCard } from ".";
import useValidator from "../../hooks/validatoin";
import { tenantAdmin } from "../../models";
import { OnboardingContext } from "../layouts";
import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import { notificationMesage, TickIcon } from "../../constants";
import { comparePassword, validateEmail, validateLowercase, validateNumber, validateUppercase } from "../../lib";

interface PasswordChecker { checker: string, status: boolean, text: string }
const MobleNoInput = forwardRef((props, ref) => {
    return <Input as={PhoneInput} defaultCountry="NG" {...props} ref={ref} />
})
const CreateSuperAdminWithoutExistingSuperAdminAccount:React.FC = () => {
    const numberRef = useRef<HTMLInputElement>(null)
    const passRef = useRef<HTMLInputElement>(null)
    const { steps, onboarding, addInfo, refresh, completeForm, resetForm, previousState, loading } = useContext(OnboardingContext)
    const [canNotSubmit, setCanNotSubmit] = useState<boolean>()
    const toast = useToast()
    const router = useRouter()
    const [isOpenPopOver, setIsOpenPopOver] = useState(false)
    const openPopOver = () => setIsOpenPopOver(true)
    const closePopOver = () => setIsOpenPopOver(false)

    const { validation, setData, setField } = useValidator<tenantAdmin>()

    const [passC, setPassC] = useState<PasswordChecker[]>()
    const [otherValidations, setOtherValidations] = useState<boolean>()
    
    const checkFieldValidityOnLoad = (passwordConditions: PasswordChecker[] ) => {
        
        if(typeof onboarding?.tenantAdmin !== "undefined") {
            // debugger
            if( typeof onboarding.tenantAdmin.password !== "undefined" && onboarding.tenantAdmin.password !== "") {
               const b = passwordConditions.map((x) => {
                switch (x.checker) {
                    case "uppercase":
                        return {
                            ...x,
                            status: validateUppercase(onboarding.tenantAdmin?.password as string)
                        }

                    case "lowercase":
                        return {
                            ...x,
                            status: validateLowercase(onboarding.tenantAdmin?.password as string)
                        }
                    case "number":
                        return {
                            ...x,
                            status: validateNumber(onboarding.tenantAdmin?.password as string)
                        }
                    case "eightminimum":
                        return {
                            ...x,
                            status: (onboarding.tenantAdmin?.password as string).length > 7
                        }
                        default:
                        return x
                }
               }) 
               
               setPassC(b)
            }else {
                // debugger
                setPassC(passwordConditions)
            }
        } else {
            setPassC(passwordConditions)
        }
    }

    const resetSuperAdmininfo = () => {
        resetForm("tenantAdmin", 
            {
                firstName:"",
                lastName:"",
                access_token:"",
                mobileNo:"",
                email:"",
                password:"",
                confirmPassword:"",
                completed: false
            } as tenantAdmin,
            1
        )
    }

    const enterSuperAdminMobile =(val: string) => {
        // debugger
        setField("mobileNo" as keyof tenantAdmin)
        addInfo("tenantAdmin", "mobileNo", val)
    }

    const checkPassworValidity = (e:React.FormEvent<HTMLInputElement>) => {
        e.stopPropagation()
        openPopOver()
        passC?.forEach((x) => {
            switch (x.checker) {
                case "uppercase":
                    setPassC(prev => prev?.map((y) => y.checker === "uppercase" ? ({
                        ...y,
                        status: validateUppercase((e.target as HTMLInputElement).value)
                    }) : y))

                    break;
                case "lowercase":
                    setPassC(prev => prev?.map((y) => y.checker === "lowercase" ? ({
                        ...y,
                        status: validateLowercase((e.target as HTMLInputElement).value)
                    }) : y))
                    break
                case "number":
                    setPassC(prev => prev?.map((y) => y.checker === "number" ? ({
                        ...y,
                        status: validateNumber((e.target as HTMLInputElement).value)
                    }) : y))
                    break
                case "eightminimum":
                    setPassC(prev => prev?.map((y) => y.checker === "eightminimum" ? ({
                        ...y,
                        status: (e.target as HTMLInputElement).value.length > 7
                    }) : y))
                    break;
            }
        })
        addData(e)
        // openPopOver()
        // var passwordOk = rules.every(function (r) { return r.test(password) });
    }

    useEffect(() => {
        if (typeof passC === "undefined") {
            const passwordConditions = [
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
            checkFieldValidityOnLoad(passwordConditions) 
        }
    }, [passC])


    const addData = useCallback((e: React.FormEvent<HTMLInputElement | HTMLSelectElement> | Event) => {
        if (typeof e.stopPropagation !== "undefined")
            e.stopPropagation()
        // debugger
        const ele = (e.target as HTMLInputElement | HTMLSelectElement)
        setField(ele.name as keyof tenantAdmin)
        const value = ele.value.toString()
        // debugger
        if (ele.name === "password") {
            // debugger
            // ele.focus()
        }
        addInfo("tenantAdmin", ele.name as keyof tenantAdmin, value)

    }, [onboarding?.tenantAdmin])

    // useEffect(() => console.log({ canNotSubmit }), [canNotSubmit])

    useEffect(() => {
        refresh("tenantAdmin", 1)
    }, [ ])

    useEffect(() => {
        // debugger
        setData(() => onboarding?.tenantAdmin as tenantAdmin)
        if (typeof onboarding?.tenantAdmin !== "undefined") {
            // debugger
            setOtherValidations(() => {
                // debugger
                const pWordCharacterValidations = ((passC as PasswordChecker[])?.filter(x => !(x?.status as boolean)).length) > 0
                const emailValidation = !validateEmail(onboarding?.tenantAdmin?.email as string)
                const mobileNoValidation = !isValidPhoneNumber(typeof onboarding?.tenantAdmin?.mobileNo !== "undefined"? onboarding?.tenantAdmin?.mobileNo as string:"")
                const pwordCompare = !comparePassword(onboarding?.tenantAdmin?.confirmPassword as string, onboarding?.tenantAdmin?.password as string)
                const isEmpty = ["firstName", "lastName", "mobileNo", "password", "email", "confrimPassword"].filter((val) => (onboarding?.tenantAdmin as tenantAdmin)[val as keyof tenantAdmin] === "").length > 0
                return pWordCharacterValidations || emailValidation || mobileNoValidation || pwordCompare || isEmpty
            })
            if(onboarding.tenantAdmin.access_token !== "") {
                resetSuperAdmininfo()
            }
        }
        return () => {
            // debugger
            // if(typeof onboarding?.tenantAdmin !== "undefined") {
            //     setData( () => undefined)
            // }
        }

    }, [onboarding?.tenantAdmin])
    useEffect(() => {
        // debugger
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
    const createSuperAdmin = useCallback(() => {
        // debugger
        if (typeof otherValidations !== "undefined" && typeof canNotSubmit !== "undefined") {
            if (!otherValidations && !canNotSubmit) {
                toast({
                    title: notificationMesage.SuccessfulSuperAdminCreation,
                    variant: "left-accent",
                    isClosable: true,
                    status: "success"
                })
                
                completeForm("tenantAdmin")
                if (typeof onboarding?.state !== "undefined" && typeof steps !== "undefined") {
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
        <Button variant="primary-button" px="115px" py="8px" isDisabled={typeof canNotSubmit !== "undefined" ? canNotSubmit : true} onClick={createSuperAdmin}  isLoading={loading.isLoading} loadingText={loading.text}>Next</Button>
    </Flex>
    return (<OnboardingCard cardTitle="" cardFooter={cardFooter}>

        <Flex gridColumnGap="21px" gridRowGap="32px" flexWrap="wrap" >
            <FormControl isRequired id="firstName" flexGrow={1} width="35%" isInvalid={validation?.errors?.firstName !== "" && validation?.touched.firstName === "touched"}>
                <FormLabel>First Name</FormLabel>

                <Input placeholder="Jane" name="firstName" borderRadius="4px" value={onboarding?.tenantAdmin?.firstName} onInput={addData} />
                <FormErrorMessage>{validation?.errors.firstName}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired id="lastName" flexGrow={1} width="35%" isInvalid={validation?.errors?.lastName !== "" && validation?.touched.lastName === "touched"}>
                <FormLabel>Last name</FormLabel>
                <Input placeholder="Doe" name="lastName" borderRadius="4px" value={onboarding?.tenantAdmin?.lastName} onInput={addData} />
                <FormErrorMessage>{validation?.errors.lastName}</FormErrorMessage>

            </FormControl>
            <FormControl isRequired id="email" flexGrow={1} width="35%" isInvalid={(!validateEmail(onboarding?.tenantAdmin?.email as string) || validation?.errors?.email !== "") && validation?.touched.email === "touched"}>
                <FormLabel>Email Address</FormLabel>

                <Input placeholder="janedoe@gmail.com" name="email" type="email" borderRadius="4px" value={onboarding?.tenantAdmin?.email} onInput={addData} />
                <FormErrorMessage>{validation?.errors.email}</FormErrorMessage>
                <FormErrorMessage>{!validateEmail(onboarding?.tenantAdmin?.email as string) && validation?.errors.email === "" ? "Invalid email" : ""}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired id="mobileNo" flexGrow={1} width="35%" isInvalid={(validation?.errors?.mobileNo !== "" || !isValidPhoneNumber(typeof onboarding?.tenantAdmin?.mobileNo !== "undefined"? onboarding?.tenantAdmin?.mobileNo as string:"")) && validation?.touched.mobileNo === "touched"}>
                <FormLabel>Phone Number</FormLabel>
                <MobleNoInput placeholder="Enter Phone no" name="mobileNo" borderRadius="4px" value={onboarding?.tenantAdmin?.mobileNo} ref={numberRef} onChange={enterSuperAdminMobile} />
                <FormErrorMessage>{validation?.errors.mobileNo}</FormErrorMessage>
                <FormErrorMessage>{validation?.errors.mobileNo === ""  && !isValidPhoneNumber(typeof onboarding?.tenantAdmin?.mobileNo !== "undefined"? onboarding?.tenantAdmin?.mobileNo as string:"")? "Invalid number" : ""}</FormErrorMessage>

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
                        <Input placeholder="Enter Password" type="password" name="password" ref={passRef} borderRadius="4px" value={onboarding?.tenantAdmin?.password}
                            onBlur={() => closePopOver()}
                            onInput={checkPassworValidity} />
                        <FormErrorMessage>{validation?.errors.password}</FormErrorMessage>

                        <FormErrorMessage> {((passC as PasswordChecker[])?.filter(x => !(x?.status as boolean)).length) > 0 && validation?.errors.password === "" ? ("Your password must be " + passC?.map(x => x.text).join(", ")) : ""}</FormErrorMessage>
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
            <FormControl isRequired id="confirmPassword" flexGrow={1} width="35%" isInvalid={(!comparePassword(onboarding?.tenantAdmin?.confirmPassword as string, onboarding?.tenantAdmin?.password as string) || validation?.errors.confirmPassword !== "") && validation?.touched.confirmPassword === "touched"}>
                <FormLabel>Confirm Password</FormLabel>
                <Input type="password" placeholder="Confirm Password" name="confirmPassword" borderRadius="4px" value={onboarding?.tenantAdmin?.confirmPassword} onInput={addData} />
                <FormErrorMessage>{validation?.errors.confirmPassword}</FormErrorMessage>
                <FormErrorMessage>{!comparePassword(onboarding?.tenantAdmin?.confirmPassword as string, onboarding?.tenantAdmin?.password as string) && validation?.errors.confirmPassword == "" ? "Confirm password does not match with password" : ""}</FormErrorMessage>

            </FormControl>
        </Flex>
    </OnboardingCard>)
}

export default CreateSuperAdminWithoutExistingSuperAdminAccount