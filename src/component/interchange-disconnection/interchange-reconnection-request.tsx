import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { Button, Flex, FormControl, HStack, Input, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Switch, useToast } from '@chakra-ui/react'
import { useForm, useLoading, useValidator } from "../../hooks";
import { CreateRoleModel, InterchangeApiResponse, InterchangeDisconnectionStatus, InterchangeReconnectionModal, InterchangeReconnectionModel, Paginate, UserManagementModal } from "../../models";
import { apiUrlsv1, appRoles, InterchangeDisconnectionModals, InterchangeReconnectionModalNames, keysForArrayComponents, notificationMesage, UserManagementModalNames, UserManagementModals } from "../../constants";
import { AuthContext, InterchangeDisconnectionContext, StatsContext } from "../../providers";
import _ from "lodash";
import { MotionModal } from "../framer/motion-modal";
import { AnimatePresence } from "framer-motion";
import { createRole, openReconnection } from "../../services/v1";
import { MotionFormErrorMessage, MotionFormLabel } from "../framer";
import { appear } from "../../animations";
import { formControlInputSX } from "../../sx";
import useSWR from "swr";
const InterchangeReconnectionRequest: FC = () => {
    const { userDetail, token } = useContext(AuthContext)
    const { tabs, modals, handleToggleModal  } = useContext(InterchangeDisconnectionContext)
    const { institutions, selectedTenantCode } = useContext(StatsContext)
    const { form, formOnChange, refreshForm } = useForm<InterchangeReconnectionModel>({
        interchangeName: "",
        tenantCode: selectedTenantCode,
        command: "open"
    })
    const { validation, addField, inputData, validateAllCompulsoryFields } = useValidator<InterchangeReconnectionModel>(["interchangeName", "tenantCode", "command"])
    const [selectedModal, setSelectedModal] = useState<InterchangeReconnectionModal>(InterchangeDisconnectionModals[2])
    const [loading, changeLoading] = useLoading()
    const toast = useToast()
    
    let url = apiUrlsv1.interchangeDisconnectionStatus
    // debugger
    if (userDetail && (userDetail.role.name !== appRoles.superAdmin || typeof selectedTenantCode !== "undefined") && (userDetail.role.name !== appRoles.superAdmin || selectedTenantCode !== "0")) {

        if (userDetail.role.name !== appRoles.superAdmin) {
            url = `${apiUrlsv1.interchangeDisconnectionStatus}/${userDetail.tenant.code}`
        } else if (userDetail.role.name === appRoles.superAdmin && selectedTenantCode !== "0") {
            url = `${apiUrlsv1.interchangeDisconnectionStatus}/${selectedTenantCode}`
        }
    }
    url = token && userDetail ? `${url}` : ""
    const { data: connnectionRequest, mutate: _mutate, error } = useSWR<Paginate<InterchangeDisconnectionStatus>>(!url ? null : url)
    const addData = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.stopPropagation()
        addField(e.target.id as keyof InterchangeReconnectionModel)
        formOnChange({ [e.target.id]: e.target.value })

    }, [])

    const requestReconnection = useCallback(async () => {

        changeLoading(() => ({ isLoading: true, text: "Creating role" }))
        try {
            if (form) {
                const data:InterchangeApiResponse = await openReconnection({...form})
                toast({
                    title: data.message,
                    variant: "left-accent",
                    isClosable: true,
                    status: "success"
                })
                handleToggleModal({ ...selectedModal, isOpen: !selectedModal.isOpen })
            }
        } catch (error:any) {
            typeof error === "string" && 
            toast({
                title: error,
                variant: "left-accent",
                isClosable: true,
                status: "error"
            })
            error && typeof error.message !== "undefined" && error.message !== null && 
            toast({
                title: error.message,
                variant: "left-accent",
                isClosable: true,
                status: "error"
            })
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
        }
    }, [form])
    useEffect(() => {
        // debugger
        const modal = modals.find((x) => x.name === InterchangeReconnectionModalNames.interchangeReconnection) as InterchangeReconnectionModal
        setSelectedModal(modal)
    }, [modals])


    return (
        <AnimatePresence>
            {typeof form !== "undefined" && <form>
                {typeof selectedModal !== "undefined" && <MotionModal exit="hide" animate="show" initial="hide" variants={appear()} size="xl" onClose={() => handleToggleModal({ ...selectedModal, isOpen: !selectedModal.isOpen })} isOpen={selectedModal?.isOpen} isCentered>
                    <ModalOverlay />
                    <ModalContent bgColor="white" px="48px">
                        <ModalHeader>{UserManagementModalNames.addNewRole}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Flex gridRowGap="23px" gridColumnGap="32px" flexWrap="wrap" >
                                <FormControl isRequired id="interchangeName" sx={formControlInputSX} isInvalid={validation?.errors?.interchangeName !== "" && validation?.touched.interchangeName === "touched"}>
                                    <MotionFormLabel>Interchange Name</MotionFormLabel>
                                                               
                                    <Select borderRadius="4px" onChange={addData} placeholder="Select an Interchange">
                                        {connnectionRequest && connnectionRequest.content && connnectionRequest.content.map((x, i) => <option key={`${keysForArrayComponents.interchangeReconnectionRequestDropdown}-${i}`} value={x.node}>{x.node}</option>)}
                                    </Select>
                                    <MotionFormErrorMessage>{validation?.errors.interchangeName}</MotionFormErrorMessage>
                                </FormControl>
                            </Flex>
                        </ModalBody>
                        <ModalFooter>
                            <HStack justifyContent="right" spacing="20px" pt="100px">
                                <Button variant="muted-primary-button" px="45px" py="8px" onClick={() => handleToggleModal({ ...selectedModal, isOpen: !selectedModal.isOpen })}>Cancel</Button>
                                <Button variant="primary-button" px="115px" py="8px" isDisabled={!validateAllCompulsoryFields()} isLoading={loading?.isLoading} loadingText={typeof loading?.text === "undefined" ? "loading" : loading.text} onClick={requestReconnection}>Request</Button>
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

export default InterchangeReconnectionRequest