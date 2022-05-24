import { appear } from "../../animations";
import { formControlInputSX } from "../../sx";
import { MobileNoInput } from "../custom-component";
import { isValidPhoneNumber } from "react-phone-number-input";
import {
    Avatar,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Text,
    Stack,
    useColorModeValue,
    useToast,
  } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { notificationMesage, TickIcon, UserManagementModalNames, UserManagementModals } from '../../constants';
import { useForm, useLoading, useValidator } from '../../hooks';
import loading from '../../hooks/loading';
import { bankAdmin, BankAdmin, CreateTenantModel, formType, PasswordChecker, tenantAdmin, UserManagementModal } from '../../models';
import { MotionFormErrorMessage, MotionFormLabel } from '../framer';
import { MotionModal } from '../framer/motion-modal';
import { comparePassword, validateEmail, validateLowercase, validateNumber, validateUppercase } from "../../lib";
import { createBankAdmin } from "../../services/v1";
import { UserManagementTabProviderContext } from "../../providers";

type SelectedModalModel = {
    isOpen: boolean
}

type ToggleModalArgs = {
    isOpen: boolean
}
interface AddNewBankAdminProps {
    handleToggleModal: (x:ToggleModalArgs)=>void,
    selectedModal: SelectedModalModel
}
  
  export default function AddNewBankAdmin(): JSX.Element {
      const [isValidEmail, setIsValidEmail] = useState(false);
      const [mobileNo, setMobileNo] = useState('');
      const { validation, addField, inputData, validateAllCompulsoryFields } = useValidator<bankAdmin>(["firstName", "lastName", "email", "mobileNo", "password", "tenantCode", "username"])
      const { form, formOnChange, refreshForm } = useForm<bankAdmin>({
        firstName: "",
        lastName: "",
        mobileNo: "",
        password: "",
        tenantCode: "",
        username: "",
        email: "",
        completed: false,
        access_token: ""
    })
    const [canNotSubmit, setCanNotSubmit] = useState<boolean>()
      
      const numberRef = useRef<HTMLInputElement>(null);
      const passRef = useRef<HTMLInputElement>(null);

      const [isOpenPopOver, setIsOpenPopOver] = useState(false)
    const openPopOver = () => setIsOpenPopOver(true)
    const closePopOver = () => setIsOpenPopOver(false)
    const [selectedModal, setSelectedModal] = useState<UserManagementModal>(UserManagementModals[3])
    const { handleToggleModal, modals } = useContext(UserManagementTabProviderContext)

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, changeLoading] = useLoading();
    const toast = useToast()
    
    const saveUser = useCallback(async () => {

        changeLoading(() => ({ isLoading: true, text: "Creating user" }))
        try {
            console.log(form)
            if (form) {
                await createBankAdmin({ ...form } as unknown as bankAdmin)
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
    }, [form]);

    const [otherValidations, setOtherValidations] = useState<boolean>()

    useEffect(() => {
      
        inputData(form as bankAdmin)
        if (typeof form !== "undefined") {
          
            setOtherValidations(() => {
              
                const pWordCharacterValidations = ((passC as PasswordChecker[])?.filter(x => !(x?.status)).length) > 0
                const emailValidation = !validateEmail(form?.email)
                const mobileNoValidation = !isValidPhoneNumber(typeof form?.mobileNo !== "undefined"? form?.mobileNo:"")
                const isEmpty = ["firstName", "lastName", "mobileNo", "password", "email", "username", "tenantCode"].filter((val) => (form)[val as keyof bankAdmin] === "").length > 0
                return pWordCharacterValidations || emailValidation || mobileNoValidation || isEmpty
            })
        }
        return () => {
          
            // if(typeof form !== "undefined") {
            //     setData( () => undefined)
            // }
        }

    }, [form])

    useEffect(() => {
      console.log(otherValidations, canNotSubmit)
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

    useEffect(() => {
        const modal = modals.find((x) => x.name === UserManagementModalNames.addNewUser) as UserManagementModal
        setSelectedModal(modal)
    }, [modals])


    const [passC, setPassC] = useState<PasswordChecker[]>()

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

    const addData = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | Event) => {
        e.stopPropagation()
        const ele = e.target as HTMLInputElement | HTMLSelectElement
        addField(ele.id as keyof BankAdmin)
        let value = ele.value.toString()
        formOnChange({ [ele.id]: value })
        if (e?.target?.id === "email") {
            setIsValidEmail(validateEmail(e?.target?.value))
        }

    }, [])

      const enterSuperAdminMobile = (val: string) => {

        addField("mobileNo")
        formOnChange({ "mobileNo": val })
    }
    return (
        <AnimatePresence>
            <MotionModal exit="hide" animate="show" initial="hide" variants={appear()} size="xl" onClose={() => handleToggleModal({ ...selectedModal, isOpen: !selectedModal.isOpen })} isOpen={selectedModal?.isOpen} isCentered>         
            <ModalOverlay />
                    <ModalContent bgColor="white" px="48px" width={"fit-content"}>
                        <ModalHeader>{UserManagementModalNames.addNewUser}</ModalHeader>
                            <ModalCloseButton />
                                <ModalBody> 
                                <Flex gridRowGap="23px" gridColumnGap="32px" flexWrap="wrap" >
                                <FormControl isRequired id="firstName" sx={formControlInputSX}>
                                     <MotionFormLabel>First Name</MotionFormLabel>

                                     <Input placeholder="Enter First Name" borderRadius="4px" value={form?.firstName} onChange={addData} />
                                     {/* <MotionFormErrorMessage>{validation?.errors.firstName}</MotionFormErrorMessage> */}
                                 </FormControl>
                                 <FormControl isRequired id="lastName" sx={formControlInputSX} >
                                     <MotionFormLabel>Last Name</MotionFormLabel>
                                     <Input placeholder="Enter Last name" borderRadius="4px" value={form?.lastName} onChange={addData} />
                                     {/* <MotionFormErrorMessage>{validation?.errors.lastName}</MotionFormErrorMessage> */}
                                 </FormControl>
                                 <FormControl isRequired id="email" sx={formControlInputSX} isInvalid={(!isValidEmail || validation?.errors?.email !== "") && validation?.touched.email === "touched"}>
                                    <MotionFormLabel>Email Address</MotionFormLabel>
                                    <Input placeholder="Enter Email Address" borderRadius="4px" value={form?.email} type="email" onChange={addData} />
                                    {validation?.errors.email && <MotionFormErrorMessage>{validation?.errors.email}</MotionFormErrorMessage>}
                                    <MotionFormErrorMessage>Email is Invalid !</MotionFormErrorMessage>
                                </FormControl>
                                <FormControl isRequired id="mobileNo" sx={formControlInputSX} isInvalid={(validation?.errors?.mobileNo !== "" || !isValidPhoneNumber(typeof mobileNo !== "undefined" ? mobileNo : "")) && validation?.touched.mobileNo === "touched"}>
                                    <MotionFormLabel>Phone Number</MotionFormLabel>
                                    <MobileNoInput placeholder="Enter Phone no" name="mobileNo" borderRadius="4px" value={mobileNo} ref={numberRef} onChange={enterSuperAdminMobile} />
                                    {validation?.errors.mobileNo && <MotionFormErrorMessage>{validation?.errors.mobileNo}</MotionFormErrorMessage>}
                                    {validation?.errors.mobileNo === "" && !isValidPhoneNumber(typeof mobileNo !== "undefined" ? mobileNo : "") && <MotionFormErrorMessage>Invalid number</MotionFormErrorMessage>}

                                </FormControl>
                                <FormControl isRequired id="username" sx={formControlInputSX} isInvalid={(!isValidEmail || validation?.errors?.username !== "") && validation?.touched.username === "touched"}>
                                    <MotionFormLabel>Username</MotionFormLabel>
                                    <Input placeholder="Enter Username" borderRadius="4px" value={form?.username} type="text" onChange={addData} />
                                </FormControl>
                                <FormControl isRequired id="tenantCode" sx={formControlInputSX} >
                                    <MotionFormLabel>Tenant code</MotionFormLabel>
                                    <Input placeholder="Enter tenant code" name="tenantCode" borderRadius="4px" value={form?.tenantCode} onChange={addData} />
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
                                </Flex>      
                                </ModalBody>
                                <ModalFooter>
                            <HStack justifyContent="right" spacing="20px" pt="100px">
                                <Button variant="muted-primary-button" px="45px" py="8px" onClick={() => handleToggleModal({ ...selectedModal, isOpen: !selectedModal.isOpen })}>Cancel</Button>
                                <Button variant="primary-button" px="115px" py="8px" isDisabled={ !validateAllCompulsoryFields() || !isValidEmail} isLoading={loading?.isLoading} loadingText={typeof loading?.text === "undefined" ? "loading" : loading.text} onClick={saveUser}>Save</Button>
                            </HStack>
                        </ModalFooter>
                    </ModalContent>
                        
                </MotionModal>
        </AnimatePresence>     
    );
  }

