import React, { FC, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Avatar, Button, Flex, FormControl, Text, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, Select, useToast } from '@chakra-ui/react'
import { useForm, useLoading, useValidator } from "../../hooks";
import { BankAdmin, ISWAdminView, PasswordChecker, RoleModel, tenantAdmin, UserManagementModal } from "../../models";
import { notificationMesage, Roles, superAdmin, TickIcon, UserManagementModalNames, UserManagementModals } from "../../constants";
import { AuthContext, UserManagementTabProviderContext } from "../../providers";
import { comparePassword, validateEmail, validateLowercase, validateNumber, validateUppercase } from "../../lib";
import _ from "lodash";
import { MotionModal } from "../framer/motion-modal";
import { AnimatePresence } from "framer-motion";
import { createBankAdmin } from "../../services/v1";
import { MotionFormErrorMessage, MotionFormLabel } from "../framer";
import { appear } from "../../animations";
import { formControlInputSX } from "../../sx";
import { MobileNoInput } from "../custom-component";
import { isValidPhoneNumber } from "react-phone-number-input";
import 'react-phone-number-input/style.css'

const AddNewUser: FC = () => {
    const numberRef = useRef<HTMLInputElement>(null)
    const passRef = useRef<HTMLInputElement>(null)
    const { userDetail } = useContext(AuthContext)
    const { handleToggleModal, modals } = useContext(UserManagementTabProviderContext)
    const { form, formOnChange, refreshForm } = useForm<tenantAdmin>({
        firstName: "",
        lastName: "",
        mobileNo: "",
        password: "",
        confirmPassword: "",
        email: "",
        completed: false,
        access_token: ""
    })
    const toast = useToast()
    const { validation, addField, inputData, validateAllCompulsoryFields } = useValidator<tenantAdmin>(["firstName", "lastName", "email", "mobileNo", "password", "confirmPassword"])
    const [selectedModal, setSelectedModal] = useState<UserManagementModal>(UserManagementModals[0])
    const [canNotSubmit, setCanNotSubmit] = useState<boolean>()
    const [otherValidations, setOtherValidations] = useState<boolean>()
    const [loading, changeLoading] = useLoading()
    const [isValidEmail, setIsValidEmail] = useState(false)
    const [passC, setPassC] = useState<PasswordChecker[]>()
    const [tenantCode, setTenantCode] = useState('')

    const [isOpenPopOver, setIsOpenPopOver] = useState(false)
    const openPopOver = () => setIsOpenPopOver(true)
    const closePopOver = () => setIsOpenPopOver(false)
    const checkFieldValidityOnLoad = (passwordConditions: PasswordChecker[]) => {

        if (typeof form !== "undefined" && typeof form.password !== "undefined" && form.password !== "") {
            const b = passwordConditions.map((x) => {
                switch (x.checker) {
                    case "uppercase":
                        return {
                            ...x,
                            status: validateUppercase(form.password)
                        }

                    case "lowercase":
                        return {
                            ...x,
                            status: validateLowercase(form.password)
                        }
                    case "number":
                        return {
                            ...x,
                            status: validateNumber(form.password)
                        }
                    case "eightminimum":
                        return {
                            ...x,
                            status: (form.password).length > 7
                        }
                    default:
                        return x
                }
            })

            setPassC(b)
        } else {

            setPassC(passwordConditions)
        }
    }

    const enterSuperAdminMobile = (val: string) => {

        addField("mobileNo")
        formOnChange({ "mobileNo": val })
    }

    const checkPassworValidity = (e: React.ChangeEvent<HTMLInputElement>) => {
        // debugger
        e.stopPropagation()
        openPopOver()
        if (passC) {
            passC.forEach((x) => {
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
        }
        addField("password")
        formOnChange({ "password": e.target.value })
        // openPopOver()
        // var passwordOk = rules.every(function (r) { return r.test(password) });
    }

    useEffect(() => {
      
        inputData(form as tenantAdmin)
        if (typeof form !== "undefined") {
          
            setOtherValidations(() => {
              
                const pWordCharacterValidations = ((passC as PasswordChecker[])?.filter(x => !(x?.status)).length) > 0
                const emailValidation = !validateEmail(form?.email)
                const mobileNoValidation = !isValidPhoneNumber(typeof form?.mobileNo !== "undefined"? form?.mobileNo:"")
                const pwordCompare = !comparePassword(form?.confirmPassword, form?.password)
                const isEmpty = ["firstName", "lastName", "mobileNo", "password", "email", "confrimPassword"].filter((val) => (form)[val as keyof tenantAdmin] === "").length > 0
                return pWordCharacterValidations || emailValidation || mobileNoValidation || pwordCompare || isEmpty
            })
        }
        return () => {
          
            // if(typeof form !== "undefined") {
            //     setData( () => undefined)
            // }
        }

    }, [form])
    useEffect(() => {
      
        if (typeof otherValidations !== "undefined") {
          
            if (otherValidations) {
                setCanNotSubmit(true)
            } else {

                setCanNotSubmit(false)
            }
        } else {
            setCanNotSubmit(true)
        }
    }, [otherValidations])

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
    const addData = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.stopPropagation()
        addField(e.target.id as keyof tenantAdmin)
        formOnChange({ [e.target.id]: e.target.value })
        if (e.target.id === "email") {
            setIsValidEmail(validateEmail(e.target.value))
        }

    }, [])

    const saveUser = useCallback(async () => {
        
        changeLoading(() => ({ isLoading: true, text: "Creating user" }))
        try {
            if (form) {
                await createBankAdmin({ ...form, tenantCode: userDetail?.role.name === superAdmin ? tenantCode : userDetail?.tenant.code } as unknown as tenantAdmin)
                refreshForm()
            }
            toast({
                status: "success",
                title: notificationMesage.SuccessfulBankAdminCreation,
                isClosable: true,
                variant: "left-accent"
            })
        } catch (error:any) {
                toast({
                    status: "error",
                    title: error? error.message?error.message : error: `${notificationMesage.Oops} ${notificationMesage.AnErrorOccurred}`,
                    isClosable: true,
                    variant: "left-accent"
                })
        }
        changeLoading(() => ({ isLoading: false, text: "" }))
    }, [form])
    useEffect(() => {

        const modal = modals.find((x) => x.name === UserManagementModalNames.addNewUser) as UserManagementModal
        setSelectedModal(modal)
    }, [modals])

    useEffect(() => {
        if (typeof selectedModal !== "undefined" && !selectedModal.isOpen) {
            refreshForm()
        }
    }, [selectedModal])

    useEffect(() => {
        if (typeof form !== "undefined") {
            inputData(form)
        }
    }, [form])


    return (
        <AnimatePresence>
            {typeof form !== "undefined" && <form>
                {typeof selectedModal !== "undefined" && <MotionModal exit="hide" animate="show" initial="hide" variants={appear()} size="xl" onClose={() => handleToggleModal({ ...selectedModal, isOpen: !selectedModal.isOpen })} isOpen={selectedModal?.isOpen} isCentered>
                    <ModalOverlay />
                    <ModalContent bgColor="white" px="48px" width={"fit-content"}>
                        <ModalHeader>{UserManagementModalNames.addNewUser}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Flex gridRowGap="23px" gridColumnGap="32px" flexWrap="wrap" >
                                <FormControl isRequired id="firstName" sx={formControlInputSX} isInvalid={validation?.errors?.firstName !== "" && validation?.touched.firstName === "touched"}>
                                    <MotionFormLabel>First Name</MotionFormLabel>

                                    <Input placeholder="Enter First Name" borderRadius="4px" value={form?.firstName} onChange={addData} />
                                    <MotionFormErrorMessage>{validation?.errors.firstName}</MotionFormErrorMessage>
                                </FormControl>
                                <FormControl isRequired id="lastName" sx={formControlInputSX} isInvalid={validation?.errors?.lastName !== "" && validation?.touched.lastName === "touched"}>
                                    <MotionFormLabel>Last Name</MotionFormLabel>
                                    <Input placeholder="Enter Last name" borderRadius="4px" value={form?.lastName} onChange={addData} />
                                    <MotionFormErrorMessage>{validation?.errors.lastName}</MotionFormErrorMessage>
                                </FormControl>
                                <FormControl isRequired id="email" sx={formControlInputSX} isInvalid={(!isValidEmail || validation?.errors?.email !== "") && validation?.touched.email === "touched"}>
                                    <MotionFormLabel>Email Address</MotionFormLabel>
                                    <Input placeholder="Enter Email Address" borderRadius="4px" value={form?.email} type="email" onChange={addData} />
                                    {validation?.errors.email && <MotionFormErrorMessage>{validation?.errors.email}</MotionFormErrorMessage>}
                                    <MotionFormErrorMessage>Email is Invalid !</MotionFormErrorMessage>
                                </FormControl>
                                <FormControl isRequired id="mobileNo" sx={formControlInputSX} isInvalid={(validation?.errors?.mobileNo !== "" || !isValidPhoneNumber(typeof form?.mobileNo !== "undefined" ? form?.mobileNo : "")) && validation?.touched.mobileNo === "touched"}>
                                    <MotionFormLabel>Phone Number</MotionFormLabel>
                                    <MobileNoInput placeholder="Enter Phone no" name="mobileNo" borderRadius="4px" value={form?.mobileNo} ref={numberRef} onChange={enterSuperAdminMobile} />
                                    {validation?.errors.mobileNo && <MotionFormErrorMessage>{validation?.errors.mobileNo}</MotionFormErrorMessage>}
                                    {validation?.errors.mobileNo === "" && !isValidPhoneNumber(typeof form?.mobileNo !== "undefined" ? form?.mobileNo : "") && <MotionFormErrorMessage>Invalid number</MotionFormErrorMessage>}

                                </FormControl>
                                {
                                    userDetail && userDetail.role.name === superAdmin && <FormControl isRequired id="tenantCode" sx={formControlInputSX} >
                                    <MotionFormLabel>Tenant code</MotionFormLabel>
                                    <Input placeholder="Enter tenant code" name="tenantCode" borderRadius="4px" value={tenantCode} onChange={(e)=> setTenantCode(e.target.value)} />
                                </FormControl>
                                }
                                <Popover
                                    returnFocusOnClose={false}
                                    isOpen={isOpenPopOver}
                                    onClose={closePopOver}
                                    placement="left"
                                    closeOnBlur={false}
                                    initialFocusRef={passRef}
                                >
                                    <PopoverTrigger>

                                        <FormControl isRequired id="password" sx={formControlInputSX} isInvalid={(((passC as PasswordChecker[])?.filter(x => !(x?.status)).length > 0) || validation?.errors?.password !== "") && validation?.touched.password === "touched"}>
                                            <FormLabel>Password</FormLabel>
                                            <Input placeholder="Enter Password" type="password" name="password" ref={passRef} borderRadius="4px" value={form?.password}
                                                onBlur={() => closePopOver()}
                                                onChange={checkPassworValidity} />
                                            {validation?.errors.password && <MotionFormErrorMessage>{validation?.errors.password}</MotionFormErrorMessage>}
                                            {((passC as PasswordChecker[])?.filter(x => !(x?.status)).length) > 0 && validation?.errors.password === "" && <MotionFormErrorMessage>Your password must be {passC?.map(x => x.text).join(", ")}</MotionFormErrorMessage>}
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent bgColor="brand.light-blue" py="25px" px="33px">
                                        <PopoverHeader fontWeight="semibold"><Text variant="card-header" fontSize="18px"> Password Requirements</Text> </PopoverHeader>
                                        <PopoverArrow bgColor="brand.light-blue" />
                                        <PopoverBody d="flex" flexDir="column" gap="16.5px" alignItems="flex-start" pt="19.5px">
                                            {passC?.map((x, i) => <Flex key={i} gap="14px" alignItems="center">{x.status ? (
                                                <Avatar boxSize="18px" bgColor="brand.success" icon={<TickIcon color="white" />}></Avatar>
                                            ) : (
                                                <Avatar boxSize="18px" showBorder borderColor="var(--chakra-colors-brand-muted)" name=" " bgColor="brand.light-blue"></Avatar>
                                            )}<Text color={x.status ? `brand.success` : `brand.muted-text`}>{x?.text}</Text></Flex>)}
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                                <FormControl isRequired id="confirmPassword" sx={formControlInputSX} isInvalid={(!comparePassword(form?.confirmPassword as string, form?.password as string) || validation?.errors.confirmPassword !== "") && validation?.touched.confirmPassword === "touched"}>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <Input type="password" placeholder="Confirm Password" name="confirmPassword" borderRadius="4px" value={form?.confirmPassword} onChange={addData} />
                                    {validation?.errors.confirmPassword && <MotionFormErrorMessage>{validation?.errors.confirmPassword}</MotionFormErrorMessage>}
                                    {!comparePassword(form?.confirmPassword as string, form?.password as string) && validation?.errors.confirmPassword == "" && <MotionFormErrorMessage>Confirm password does not match with password</MotionFormErrorMessage>}
                                </FormControl>
                            </Flex>
                        </ModalBody>
                        <ModalFooter>
                            <HStack justifyContent="right" spacing="20px" pt="100px">
                                <Button variant="muted-primary-button" px="45px" py="8px" onClick={() => handleToggleModal({ ...selectedModal, isOpen: !selectedModal.isOpen })}>Cancel</Button>
                                <Button variant="primary-button" px="115px" py="8px" isDisabled={ canNotSubmit || !validateAllCompulsoryFields() || !isValidEmail} isLoading={loading?.isLoading} loadingText={typeof loading?.text === "undefined" ? "loading" : loading.text} onClick={saveUser}>Save</Button>
                            </HStack>
                        </ModalFooter>
                    </ModalContent>
                </MotionModal>}
            </form>
            }
        </AnimatePresence>)
}

export default AddNewUser