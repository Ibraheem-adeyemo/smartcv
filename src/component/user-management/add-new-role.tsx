import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { Button, Flex, FormControl, HStack, Input, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Switch } from '@chakra-ui/react'
import { useForm, useLoading, useValidator } from "../../hooks";
import { BankAdmin, CreateRoleModel, UserManagementModal } from "../../models";
import { UserManagementModalNames, UserManagementModals } from "../../constants";
import { AuthContext, StatsContext, UserManagementTabProviderContext } from "../../providers";
import { validateEmail } from "../../lib";
import _ from "lodash";
import { MotionModal } from "../framer/motion-modal";
import { AnimatePresence } from "framer-motion";
import { createBankAdmin } from "../../services/v1";
import { MotionFormErrorMessage, MotionFormLabel } from "../framer";
import { appear } from "../../animations";
const permissions = [{
    valuw: 1,
    name: "Permision 1"
}, {
    valuw: 2,
    name: "Permision 2"
}, {
    valuw: 3,
    name: "Permision 3"
}]
const AddNewRole: FC = () => {
    const { userDetail } = useContext(AuthContext)
    const { handleToggleModal, modals } = useContext(UserManagementTabProviderContext)
    const { institutions } = useContext(StatsContext)
    const { form, formOnChange, refreshForm } = useForm<CreateRoleModel>({
        name: "",
        tenantCode: "",
        permissionIds: []
    })
    const { validation, addField, inputData, validateAllCompulsoryFields } = useValidator<CreateRoleModel>(["name", "tenantCode", "permissionIds"])
    const [selectedModal, setSelectedModal] = useState<UserManagementModal>(UserManagementModals[2])
    const [loading, changeLoading] = useLoading()
    const [isValidEmail, setIsValidEmail] = useState(false)
    const addData = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.stopPropagation()
        addField(e.target.id as keyof CreateRoleModel)
        formOnChange({ [e.target.id]: e.target.value })
        if (e.target.id === "email") {
            setIsValidEmail(validateEmail(e.target.value))
        }

    }, [])

    const addMultiple = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        debugger
        addField("permissionIds" as keyof CreateRoleModel)
        let a = form ? form.permissionIds : []
        if (e.target.checked) {
            if (a.findIndex(x => x === +e.target.value) < 0) {
                a.push(+e.target.value)
            }
        } else {
            if (a.findIndex(x => x === +e.target.value) > -1) {
                a = a.filter(x => x !== +e.target.value)
            }
        }
        formOnChange({ "permissionIds": a })
    }, [form?.permissionIds])

    const saveRole = useCallback(async () => {

        changeLoading(() => ({ isLoading: true, text: "Creating role" }))
        try {
            if (form) {
                await createBankAdmin({ ...form, tenantCode: userDetail?.tenant.code } as unknown as BankAdmin)
            }
        } catch (error) {

        }
        changeLoading(() => ({ isLoading: false, text: "" }))
    }, [form])

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
    useEffect(() => {

        const modal = modals.find((x) => x.name === UserManagementModalNames.addNewRole) as UserManagementModal
        setSelectedModal(modal)
    }, [modals])


    return (
        <AnimatePresence>
            {typeof form !== "undefined" && <form>
                {typeof selectedModal !== "undefined" && <MotionModal exit="hide" animate="show" initial="hide" variants={appear} size="xl" onClose={() => handleToggleModal({ ...selectedModal, isOpen: !selectedModal.isOpen })} isOpen={selectedModal?.isOpen} isCentered>
                    <ModalOverlay />
                    <ModalContent bgColor="white" px="48px">
                        <ModalHeader>{UserManagementModalNames.addNewRole}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Flex gridRowGap="23px" gridColumnGap="32px" flexWrap="wrap" >
                                <FormControl isRequired id="name" flexGrow={1} width="35%" isInvalid={validation?.errors?.name !== "" && validation?.touched.name === "touched"}>
                                    <MotionFormLabel>Name</MotionFormLabel>

                                    <Input placeholder="Enter role name" borderRadius="4px" value={form?.name} onChange={addData} />
                                    <MotionFormErrorMessage>{validation?.errors.name}</MotionFormErrorMessage>
                                </FormControl>
                                <FormControl isRequired id="tenantCode" flexGrow={1} width="35%" isInvalid={validation?.errors?.tenantCode !== "" && validation?.touched.tenantCode === "touched"}>
                                    <MotionFormLabel>Bank</MotionFormLabel>
                                    <Select borderRadius="4px" value={form?.tenantCode} onChange={addData} placeholder="Select an institution">
                                        {institutions?.map((x, i) => <option key={i} value={x.tenantCode}>{x.name}</option>)}
                                    </Select>
                                    <MotionFormErrorMessage>{validation?.errors.tenantCode}</MotionFormErrorMessage>
                                </FormControl>
                                <FormControl isRequired id="permissionId" flexGrow={1} width="35%" isInvalid={validation?.errors?.permissionIds !== "" && validation?.touched.permissionIds === "touched"}>
                                    {permissions.map((x, i) =>
                                        <>
                                            <MotionFormLabel >
                                                {x.name}
                                            </MotionFormLabel>
                                            <Switch onChange={addMultiple} value={x.valuw} />
                                        </>)
                                    }
                                    <MotionFormErrorMessage>{validation?.errors.permissionIds}</MotionFormErrorMessage>
                                </FormControl>
                            </Flex>
                        </ModalBody>
                        <ModalFooter>
                            <HStack justifyContent="right" spacing="20px" pt="100px">
                                <Button variant="muted-primary-button" px="45px" py="8px" onClick={() => handleToggleModal({ ...selectedModal, isOpen: !selectedModal.isOpen })}>Cancel</Button>
                                <Button variant="primary-button" px="115px" py="8px" isDisabled={!validateAllCompulsoryFields()} isLoading={loading?.isLoading} loadingText={typeof loading?.text === "undefined" ? "loading" : loading.text} onClick={saveRole}>Save</Button>
                            </HStack>
                        </ModalFooter>
                    </ModalContent>
                </MotionModal>
                }
            </form>
            }
        </AnimatePresence>
    )
}

export default AddNewRole