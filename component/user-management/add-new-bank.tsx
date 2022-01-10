import { Image, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Flex, FormControl, FormLabel, Input, FormErrorMessage, Select, ModalFooter, HStack, Button, Badge, Box, CloseButton, Skeleton, VStack, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from "@chakra-ui/react";
import _, { map, range } from "lodash";
import React, { FC, useCallback, useContext, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { apiUrlsv1, Images, PickerIcon, UserManagementModalNames, UserManagementModals } from "../../constants";
import { useForm, useLoading, useValidator } from "../../hooks";
import { validateHexColor } from "../../lib";
import { InstitutionColor, InstitutionColorInfo, State, TenantView, UserManagementModal } from "../../models";
import { UserManagementTabProviderContext } from "../../provider/user-management-tab-provider";

const AddNewBank:FC = () => {
    const { data: states, error } = useSWR<State[]>(apiUrlsv1.states)
    const { handleToggleModal, modals } = useContext(UserManagementTabProviderContext)
    const { form, formOnChange, refreshForm } = useForm<TenantView>({
        name: "",
        image: "",
        logo: "",
        tenantCode: "",
        address: "",
        dateCreated: "",
        bankSuperAdmin: "",
        status: "",
        location: "",
        branch: "",
        code:""
    })
    const {form:institutionColorForm, formOnChange:institutionColorFormOnChange, refreshForm:institutionColorRefreshForm} = useForm<InstitutionColor>({
        headerColor: "#C8D2D6",
        buttonColor: "#AAB7C6",
        sidebarColor: "#E1E6ED"
    })
    const fileRef = useRef<HTMLInputElement>(null)
    const headerColorRef = useRef<HTMLInputElement>(null)
    const sidebarColorRef = useRef<HTMLInputElement>(null)
    const buttonColorRef = useRef<HTMLInputElement>(null)
    const { validation, addField, inputData, validateAllCompulsoryFields } = useValidator<TenantView>(["name", "logo", "address", "location", "branch", "tenantCode"])
    const {validation: institutionColorValidation, addField:institutionColorAddField, inputData: institutionColorInputData  } = useValidator<InstitutionColorInfo>()
    const [selectedModal, setSelectedModal] = useState<UserManagementModal>(UserManagementModals[1])
    const [loading, changeLoading] = useLoading()
    const addData = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | Event) => {
        e.stopPropagation()
        const ele = e.target as HTMLInputElement | HTMLSelectElement
        addField(ele.id as keyof TenantView)
        let value = ""
        if (ele.id === "logo") {
            let v = e as React.ChangeEvent<HTMLInputElement>
            const reader = new FileReader();
            const file = v.target.files as FileList

            if (file.length > 0) {
                reader.readAsDataURL(file[0] as Blob)
                reader.onload = () => {
                    // debugger
                    value = reader.result?.toString() as string
                    addField(ele.id as keyof TenantView)
                    formOnChange({ "logo": value })
                }
            }
        } else {
            value = ele.value.toString()
        }
        formOnChange({ [ele.id]: value })

    }, [])

    function setInitTialColorProps() {
        institutionColorRefreshForm()
    }
    function setHeaderColor(e: React.FormEvent<HTMLInputElement>) {

        e.stopPropagation()
        // debugger
        institutionColorAddField("headerColor")
        institutionColorFormOnChange({"headerColor":(e.target as HTMLInputElement).value})
    }
    function setButtonColor(e: React.FormEvent<HTMLInputElement>) {
        e.stopPropagation()
        institutionColorAddField("buttonColor")
        institutionColorFormOnChange({"buttonColor":(e.target as HTMLInputElement).value})
    }

    function setSidebarColor(e: React.FormEvent<HTMLInputElement>) {

        e.stopPropagation()
        institutionColorAddField("sidebarColor")
        institutionColorFormOnChange({"sidebarColor":(e.target as HTMLInputElement).value})
    }

    const saveBank = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        // debugger
        changeLoading((prev) => ({ isLoading: true, text: "Creating bank" }))
        handleToggleModal({ ...selectedModal, isSubmitted: !selectedModal.isSubmitted })
        changeLoading((prev) => ({ isLoading: false, text: "" }))
    }, [form])
    useEffect(() => {
        // debugger
        const modal = modals.find((x, i) => x.name === UserManagementModalNames.addNewBank) as UserManagementModal
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

    useEffect(() => {
        if (typeof institutionColorForm !== "undefined") {
            institutionColorInputData(institutionColorForm)
            // console.log({ validation })
        }
    }, [institutionColorForm])
    return (
        <>
            {typeof form !== "undefined" && <form>
                {typeof selectedModal !== "undefined" && <Modal scrollBehavior="inside" size="xl" onClose={() => handleToggleModal({ ...selectedModal, isOpen: !selectedModal.isOpen })} isOpen={selectedModal?.isOpen} isCentered>
                    <ModalOverlay />
                    <ModalContent bgColor="white" px="18px">
                        <ModalHeader>{UserManagementModalNames.addNewBank}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Flex gridColumnGap="21px" gridRowGap="32px" flexWrap="wrap" >
                                <FormControl isRequired id="name" flexGrow={1} width="50%" isInvalid={validation?.errors?.name !== "" && validation?.touched.name === "touched"}>
                                    <FormLabel>Bank Name</FormLabel>

                                    <Input placeholder="Enter Bank Name" borderRadius="4px" value={form.name} onChange={addData} />
                                    <FormErrorMessage>{validation?.errors.name}</FormErrorMessage>
                                </FormControl>
                                <FormControl isRequired id="tenantCode" flexGrow={1} width="35%" isInvalid={validation?.errors?.tenantCode !== "" && validation?.touched.tenantCode === "touched"}>
                                    <FormLabel>Bank ID</FormLabel>
                                    <Input placeholder="Enter Bank ID" borderRadius="4px" value={form.tenantCode} onChange={addData} />
                                    <FormErrorMessage>{validation?.errors.tenantCode}</FormErrorMessage>
                                </FormControl>
                                <FormControl isRequired id="branch" flexGrow={1} width="35%" isInvalid={validation?.errors?.branch !== "" && validation?.touched.branch === "touched"}>
                                    <FormLabel>Bank Branch</FormLabel>

                                    <Input placeholder="Enter Bank Branch" borderRadius="4px" value={form.branch} onChange={addData} />
                                    <FormErrorMessage>{validation?.errors.branch}</FormErrorMessage>
                                </FormControl>
                                <FormControl isRequired id="location" flexGrow={1} width="35%" isInvalid={validation?.errors?.location !== "" && validation?.touched.location === "touched"}>
                                    <FormLabel>Bank Locatoin</FormLabel>
                                    <Select borderRadius="4px" value={form.location} onChange={addData} placeholder="Select a state">
                                        {states?.map((x, i) => <option key={i} value={x.id}>{x.name}</option>)}
                                    </Select>
                                    <FormErrorMessage>{validation?.errors.location}</FormErrorMessage>
                                </FormControl>
                                <FormControl isRequired id="address" flexGrow={2} width="100%" isInvalid={validation?.errors?.address !== "" && validation?.touched.address === "touched"}>
                                    <FormLabel>Bank Address</FormLabel>
                                    <Input placeholder="Enter Bank Address" borderRadius="4px" value={form.address} onChange={addData} />
                                    <FormErrorMessage>{validation?.errors.address}</FormErrorMessage>
                                </FormControl>
                                <FormControl isRequired id="logo" width="15%" flexGrow={1} isInvalid={validation?.errors?.logo !== "" && validation?.touched.logo === "touched"}>
                                    <FormLabel>Upload a Bank Logo</FormLabel>
                                    <Input placeholder="Enter Bank Address" ref={fileRef} borderRadius="4px" type="file" sx={{
                                        display: "none"
                                    }} border="dotted" onChange={addData} />
                                    <Button border="1px dashed" borderColor="brand.mutext-text" w="100%" bgColor="white" px="70px" py="9px" onClick={() => {
                                        fileRef.current?.click()
                                    }}>
                                        <Flex gridGap="29px">
                                            <Image src={`${Images.imageUpload}`} h="46px" w="47px" />
                                            <Flex flexDir="column" gridGap="4px" justifyContent="center">
                                                <Text color="brand.muted-text" size="dropdown-text">Browse File</Text>
                                                <Text color="brand.muted-text" size="tiny-text">File format: JPG, PNG</Text>
                                            </Flex>
                                        </Flex>
                                    </Button>
                                    <FormErrorMessage>{validation?.errors.logo}</FormErrorMessage>
                                </FormControl>
                                <FormControl id="logo" w="25%" flexGrow={1} >
                                    <Box w="fit-content">
                                        {form.logo !== "" &&

                                            <><Badge pos="absolute" borderRadius="full"><CloseButton onClick={(e) => {
                                                // debugger
                                                const s = new Event('change');
                                                (fileRef.current as HTMLInputElement).value = ""
                                                fileRef.current?.addEventListener('change', addData)
                                                fileRef.current?.dispatchEvent(s)
                                            }} /></Badge>
                                                <Image src={form.logo} h="127px" w="auto" /></>}
                                    </Box>
                                </FormControl>
                                <FormControl>
                                    <Accordion allowToggle>
                                        <AccordionItem>
                                            <h2>
                                                <AccordionButton>
                                                    <Box flex="1" textAlign="left">
                                                        Add Institution Color
                                                    </Box>
                                                    <AccordionIcon />
                                                </AccordionButton>
                                            </h2>
                                            <AccordionPanel pb={4}>
                                                <Flex flexDir="column" gridGap="25px" w={"475px"}>
                                                    <Flex w="100%" h="262px" flexDir="column" bgColor={"#F3F5F6"} gridGap="26px" borderRadius="6px">
                                                        <Skeleton speed={0} w="100%" h="26px" bgColor={institutionColorForm?.headerColor} />
                                                        <Flex flexDir="column" gridGap="39px" pl="26px" pr="20px">
                                                            <Flex gridGap="29px">
                                                                <Flex flexDir="column" gridGap="13px">
                                                                    {map(range(0, 3), (x) => <Skeleton key={x} speed={0} bgColor={institutionColorForm?.sidebarColor} w="92px" h="13px" borderRadius="8px" />)}
                                                                </Flex>
                                                                <Flex flexDir="column" gridGap="13px">
                                                                    {map(range(0, 4), (x) => <Skeleton key={x} speed={0} w="289px" bgColor="#E1E6ED" h="14px" borderRadius="8px" />)}
                                                                </Flex>
                                                            </Flex>
                                                            <Skeleton w="154px" h="53px" speed={0} alignSelf="flex-end" bgColor={institutionColorForm?.buttonColor} borderRadius="8px" />
                                                        </Flex>
                                                    </Flex>
                                                    <VStack spacing='8px'>
                                                        <Text color="muted-text" textAlign="left" w="100%">Enter the hex code or use the colour picker</Text>
                                                        <Flex bgColor="brand.muted-background" border={ typeof institutionColorValidation?.touched !== "undefined" && institutionColorValidation?.touched.headerColor === "touched" && !validateHexColor( institutionColorForm?.headerColor as string) ? "1px solid red" : "unset"} borderRadius="8px" w="100%" alignItems="center" px="12px" py="16px">
                                                            <Button bgColor={institutionColorForm?.headerColor} w="40px" h="16px" borderRadius="8px" onClick={
                                                                () => {
                                                                    headerColorRef.current?.click()
                                                                }
                                                            }>
                                                                <Input bgColor={headerColorRef.current?.value} visibility="hidden" ref={headerColorRef} onChange={setHeaderColor} name="headerColor" type="color" w="40px" h="16px" borderRadius="8px" value={institutionColorForm?.headerColor} />
                                                            </Button>
                                                            <Input placeholder="Header colour eg. #04257F" border="0" bgColor="brand.muted-background" value={institutionColorForm?.headerColor} onInput={setHeaderColor} />
                                                            <PickerIcon />
                                                        </Flex>
                                                        <Text color="red">{typeof institutionColorValidation?.touched !== "undefined" && institutionColorValidation?.touched.headerColor === "touched" && !validateHexColor( institutionColorForm?.headerColor as string) ? "This hexcode is invalid" : ""}</Text>
                                                        <Flex bgColor="brand.muted-background" borderRadius="8px" border={typeof institutionColorValidation?.touched !== "undefined" && institutionColorValidation?.touched.buttonColor === "touched" && !validateHexColor( institutionColorForm?.buttonColor as string) ? "1px solid red" : "unset"} w="100%" alignItems="center" px="12px" py="16px">
                                                            <Button bgColor={institutionColorForm?.buttonColor} w="40px" h="16px" borderRadius="8px" onClick={
                                                                () => {
                                                                    buttonColorRef.current?.click()
                                                                }
                                                            }>
                                                                <Input visibility="hidden" type="color" name="buttonColor" w="40px" ref={buttonColorRef} onChange={setButtonColor} h="16px" borderRadius="8px" value={institutionColorForm?.buttonColor} />
                                                            </Button>
                                                            <Input placeholder="Buttons & links colour eg. #04257F" border="0" value={institutionColorForm?.buttonColor} bgColor="brand.muted-background" onInput={setButtonColor} />
                                                            <PickerIcon />
                                                        </Flex>
                                                        <Text color="red">{typeof institutionColorValidation?.touched !== "undefined" && institutionColorValidation?.touched.buttonColor === "touched" && !validateHexColor( institutionColorForm?.buttonColor as string) ? "This hexcode is invalid" : ""}</Text>
                                                        <Flex bgColor="brand.muted-background" borderRadius="8px" w="100%" border={typeof institutionColorValidation?.touched !== "undefined" && institutionColorValidation?.touched.headerColor === "touched" && !validateHexColor( institutionColorForm?.sidebarColor as string) ? "1px solid red" : "unset"} alignItems="center" px="12px" py="16px">
                                                            <Button bgColor={institutionColorForm?.sidebarColor} w="40px" h="16px" borderRadius="8px" onClick={
                                                                () => {
                                                                    sidebarColorRef.current?.click()
                                                                }
                                                            }>
                                                                <Input visibility="hidden" ref={sidebarColorRef} name="sidebarColor" onChange={setSidebarColor} type="color" w="40px" h="16px" borderRadius="8px" value={institutionColorForm?.sidebarColor} />
                                                            </Button>
                                                            <Input placeholder="Side menu & accents eg. #04257F" value={institutionColorForm?.sidebarColor} border="0" bgColor="brand.muted-background" onInput={setSidebarColor} />
                                                            <PickerIcon />
                                                        </Flex>
                                                        <Text color="red">{typeof institutionColorValidation?.touched !== "undefined" && institutionColorValidation?.touched.sidebarColor === "touched" && !validateHexColor( institutionColorForm?.sidebarColor as string) ? "This hexcode is invalid" : ""}</Text>
                                                    </VStack>
                                                </Flex>

                                            </AccordionPanel>
                                        </AccordionItem>
                                    </Accordion>
                                </FormControl>
                            </Flex>
                        </ModalBody>
                        <ModalFooter>
                            <HStack justifyContent="right" spacing="20px">
                                <Button variant="muted-primary-button" px="45px" py="8px" onClick={() => handleToggleModal({ ...selectedModal, isOpen: !selectedModal.isOpen })}>Cancel</Button>
                                <Button variant="primary-button" px="115px" py="8px" isDisabled={!validateAllCompulsoryFields()} isLoading={loading?.isLoading} loadingText={typeof loading?.text === "undefined" ? "loading" : loading.text} onClick={saveBank}>Save</Button>
                            </HStack>
                        </ModalFooter>
                    </ModalContent>
                </Modal>}
            </form>
            }
        </>)
}

export default AddNewBank