import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select } from '@chakra-ui/react'
import { useForm, useLoading, useValidator } from "../../hooks";
import { BankAdmin, ISWAdminView, RoleModel, UserManagementModal } from "../../models";
import { Roles, UserManagementModalNames, UserManagementModals } from "../../constants";
import { AuthContext, UserManagementTabProviderContext } from "../../providers";
import { validateEmail } from "../../lib";
import _ from "lodash";
import { MotionModal } from "../framer/motion-modal";
import { AnimatePresence } from "framer-motion";
import { createBankAdmin } from "../../services/v1";
import { MotionFormErrorMessage, MotionFormLabel } from "../framer";
import { appear } from "../../animations";
import { formControlInputSX } from "../../sx";

const AddNewUser: FC = () => {
    const {userDetail} = useContext(AuthContext)
    const { handleToggleModal, modals } = useContext(UserManagementTabProviderContext)
    const { form, formOnChange, refreshForm } = useForm<ISWAdminView>({
        firstName: "",
        lastName: "",
        status: "",
        email: "",
        dateCreated: ""
    })
    const { validation, addField, inputData, validateAllCompulsoryFields } = useValidator<ISWAdminView>(["firstName", "lastName", "email"])
    const [selectedModal, setSelectedModal] = useState<UserManagementModal>(UserManagementModals[0])
    const [loading, changeLoading] = useLoading()
    const [isValidEmail, setIsValidEmail] = useState(false)
    const addData = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.stopPropagation()
        addField(e.target.id as keyof ISWAdminView)
        formOnChange({ [e.target.id]: e.target.value })
        if (e.target.id === "email") {
            setIsValidEmail(validateEmail(e.target.value))
        }

    }, [])

    const saveUser = useCallback(async () => {

        changeLoading(() => ({ isLoading: true, text: "Creating user" }))
        try {
            if(form) {
                await createBankAdmin({...form, tenantCode: userDetail?.tenant.code} as unknown as BankAdmin)
            }
        } catch (error) {
            
        }
        handleToggleModal({ ...selectedModal, isSubmitted: !selectedModal.isSubmitted })
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
            // console.log({ validation })
        }
    }, [form])


    return (
        <AnimatePresence>
            {typeof form !== "undefined" && <form>
                {typeof selectedModal !== "undefined" && <MotionModal exit="hide" animate="show" initial="hide" variants={appear()} size="xl" onClose={() => handleToggleModal({ ...selectedModal, isOpen: !selectedModal.isOpen })} isOpen={selectedModal?.isOpen} isCentered>
                    <ModalOverlay />
                    <ModalContent bgColor="white" px="48px">
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
                                    <MotionFormErrorMessage>{validation?.errors.email}</MotionFormErrorMessage>
                                    <MotionFormErrorMessage>Email is Invalid !</MotionFormErrorMessage>
                                </FormControl>
                            </Flex>
                        </ModalBody>
                        <ModalFooter>
                            <HStack justifyContent="right" spacing="20px" pt="100px">
                                <Button variant="muted-primary-button" px="45px" py="8px" onClick={() => handleToggleModal({ ...selectedModal, isOpen: !selectedModal.isOpen })}>Cancel</Button>
                                <Button variant="primary-button" px="115px" py="8px" isDisabled={!validateAllCompulsoryFields() || !isValidEmail} isLoading={loading?.isLoading} loadingText={typeof loading?.text === "undefined" ? "loading" : loading.text} onClick={saveUser}>Save</Button>
                            </HStack>
                        </ModalFooter>
                    </ModalContent>
                </MotionModal>}
            </form>
            }
        </AnimatePresence>)
}

export default AddNewUser