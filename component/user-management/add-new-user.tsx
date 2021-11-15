import React, { useCallback, useContext, useEffect, useState } from "react";
import { AppCard } from "..";
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text } from '@chakra-ui/react'
import onboarding from "../layouts/onboarding";
import { useForm, useLoading, useValidator } from "../../hooks";
import { ISWAdminView, UserManagementModal } from "../../models";
import { methods, Roles, UserManagementModalNames, userManagementTabsName } from "../../constants";
import { UserManagementTabProviderContext } from "../../provider/user-management-tab-provider";
import { validateEmail } from "../../lib";

export default function AddNewUser(_props: any) {
    const { handleToggleModal, modals } = useContext(UserManagementTabProviderContext)
    const { form, formOnChange, refreshForm } = useForm<ISWAdminView>({
        firstName: "",
        lastName: "",
        status: "",
        email: "",
        role: "",
        dateCreated: ""
    })
    const { validation, addField, inputData, validateAllCompulsoryFields } = useValidator<ISWAdminView>(["firstName", "lastName", "role", "email"])
    const [selectedModal, setSelectedModal] = useState<UserManagementModal>()
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

    const saveUser = useCallback(() => {

    }, [form])
    useEffect(() => {
        const modal = modals.find((x, i) => x.name === UserManagementModalNames.addNewUser)
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
            console.log({ validation })
        }
    }, [form])


    return (
        <>
            {typeof form !== "undefined" && <form method={methods.post} action={form?.postUrl} onSubmit={saveUser}>
                {typeof selectedModal !== "undefined" && <Modal size="xl" onClose={() => handleToggleModal(UserManagementModalNames.addNewUser)} isOpen={selectedModal?.isOpen} isCentered>
                    <ModalOverlay />
                    <ModalContent bgColor="white" px="48px">
                        <ModalHeader>{UserManagementModalNames.addNewUser}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Flex gridRowGap="23px" gridColumnGap="32px" flexWrap="wrap" >
                                <FormControl isRequired id="firstName" flexGrow={1} width="35%" isInvalid={validation?.errors?.firstName !== "" && validation?.touched.firstName === "touched"}>
                                    <FormLabel>First Name</FormLabel>

                                    <Input placeholder="Enter First Name" borderRadius="4px" value={form?.firstName} onChange={addData} />
                                    <FormErrorMessage>{validation?.errors.firstName}</FormErrorMessage>
                                </FormControl>
                                <FormControl isRequired id="lastName" flexGrow={1} width="35%" isInvalid={validation?.errors?.lastName !== "" && validation?.touched.lastName === "touched"}>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input placeholder="Enter Last name" borderRadius="4px" value={form?.lastName} onChange={addData} />
                                    <FormErrorMessage>{validation?.errors.lastName}</FormErrorMessage>
                                </FormControl>
                                <FormControl isRequired id="email" flexGrow={1} width="35%" isInvalid={(!isValidEmail || validation?.errors?.email !== "") && validation?.touched.email === "touched"}>
                                    <FormLabel>Email Address</FormLabel>
                                    <Input placeholder="Enter Email Address" borderRadius="4px" value={form?.email} type="email" onChange={addData} />
                                    <FormErrorMessage>{validation?.errors.email}</FormErrorMessage>
                                    {!isValidEmail && validation?.errors?.email === "" && <FormErrorMessage>Email is Invalid !</FormErrorMessage>}
                                </FormControl>
                                <FormControl isRequired id="role" flexGrow={1} width="35%" isInvalid={validation?.errors?.role !== "" && validation?.touched.role === "touched"}>
                                    <FormLabel>Role</FormLabel>
                                    <Select placeholder="Select Role" borderRadius="4px" value={form?.role} onChange={addData}>
                                        {Roles?.map((x, i) => <option key={i} value={x}>{x}</option>)}
                                    </Select>
                                    <FormErrorMessage>{validation?.errors.role}</FormErrorMessage>
                                </FormControl>
                            </Flex>
                        </ModalBody>
                        <ModalFooter>
                            <HStack justifyContent="right" spacing="20px" pt="100px">
                                <Button variant="muted-primary-button" px="45px" py="8px" onClick={() => handleToggleModal(UserManagementModalNames.addNewUser)}>Cancel</Button>
                                <Button variant="primary-button" px="115px" py="8px" isDisabled={!validateAllCompulsoryFields() || !isValidEmail} isLoading={loading?.isLoading} loadingText={typeof loading?.text === "undefined" ? "loading" : loading.text} type="submit">Save</Button>
                            </HStack>
                        </ModalFooter>
                    </ModalContent>
                </Modal>}
            </form>
            }
        </>)
}