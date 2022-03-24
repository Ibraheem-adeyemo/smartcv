import { Image, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Flex, FormControl, FormLabel, Input, FormErrorMessage, Select, ModalFooter, HStack, Button, Badge, Box, CloseButton, Skeleton, VStack, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, useToast } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import _, { map, range } from "lodash";
import React, { FC, useCallback, useContext, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { appear } from "../../animations";
import { apiUrlsv1, Images, PickerIcon, UserManagementModalNames, UserManagementModals } from "../../constants";
import { useForm, useLoading, useValidator } from "../../hooks";
import { validateHexColor } from "../../lib";
import { InstitutionColor, InstitutionColorInfo, State, TenantInput, TenantView, UserManagementModal } from "../../models";
import { UserManagementTabProviderContext } from "../../providers";
import { createTenantAsync } from "../../services/v1";
import { formControlInputSX } from "../../sx";
import { AnimatedText, MotionFormErrorMessage, MotionFormLabel } from "../framer";
import { MotionModal } from "../framer/motion-modal";

const AddNewBank:FC = () => {
    const { data: states } = useSWR<State[]>(apiUrlsv1.states)
    const { handleToggleModal, modals } = useContext(UserManagementTabProviderContext)
    const toast = useToast()
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
        sidebarColour: "#E1E6ED"
    })
    const fileRef = useRef<HTMLInputElement>(null)
    const headerColorRef = useRef<HTMLInputElement>(null)
    const sidebarColourRef = useRef<HTMLInputElement>(null)
    const buttonColorRef = useRef<HTMLInputElement>(null)
    const { validation, addField, inputData, validateAllCompulsoryFields } = useValidator<TenantView>(["name", "logo", "address", "location", "branch", "tenantCode"])
    const {validation: institutionColorValidation, addField:institutionColorAddField, inputData: institutionColorInputData  } = useValidator<InstitutionColor>()
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
      
        institutionColorAddField("headerColor")
        institutionColorFormOnChange({"headerColor":(e.target as HTMLInputElement).value})
    }
    function setButtonColor(e: React.FormEvent<HTMLInputElement>) {
        e.stopPropagation()
        institutionColorAddField("buttonColor")
        institutionColorFormOnChange({"buttonColor":(e.target as HTMLInputElement).value})
    }

    function setsidebarColour(e: React.FormEvent<HTMLInputElement>) {

        e.stopPropagation()
        institutionColorAddField("sidebarColour")
        institutionColorFormOnChange({"sidebarColour":(e.target as HTMLInputElement).value})
    }

    const saveBank = useCallback(async(e: React.MouseEvent<HTMLButtonElement>) => {
        changeLoading((prev) => ({ isLoading: true, text: "Creating bank" }))
      try {
        await createTenantAsync(
            {
                ...form,
                color: {
                    ...institutionColorForm
        }} as unknown as TenantInput)
      } catch (error: any) {
          toast({
            status: "error",
            title: typeof error.message === "undefined" ? error : error.message,
            isClosable: true,
            variant: "left-accent"
          })
      }
        handleToggleModal({ ...selectedModal, isSubmitted: !selectedModal.isSubmitted })
        // console.log()
        changeLoading((prev) => ({ isLoading: false, text: "" }))
    }, [form])
    useEffect(() => {
      
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
        <AnimatePresence>
            {typeof form !== "undefined" && <form>
                {typeof selectedModal !== "undefined" && <MotionModal exit="hide" animate="show" initial="hide" variants={appear()} scrollBehavior="inside" size="xl" onClose={() => handleToggleModal({ ...selectedModal, isOpen: !selectedModal.isOpen })} isOpen={selectedModal?.isOpen} isCentered>
                    <ModalOverlay />
                    <ModalContent bgColor="white" px="18px">
                        <ModalHeader>{UserManagementModalNames.addNewBank}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Flex gridColumnGap="21px" gridRowGap="32px" flexWrap="wrap" >
                            
                                <FormControl isRequired id="name" flexGrow={1} width="50%" isInvalid={validation?.errors?.name !== "" && validation?.touched.name === "touched"}>
                                    <MotionFormLabel>Bank Name</MotionFormLabel>

                                    <Input placeholder="Enter Bank Name" borderRadius="4px" value={form.name} onChange={addData} />
                                    <MotionFormErrorMessage>{validation?.errors.name}</MotionFormErrorMessage>
                                </FormControl>
                                <FormControl isRequired id="tenantCode" sx={formControlInputSX} isInvalid={validation?.errors?.tenantCode !== "" && validation?.touched.tenantCode === "touched"}>
                                    <MotionFormLabel>Bank ID</MotionFormLabel>
                                    <Input placeholder="Enter Bank ID" borderRadius="4px" value={form.tenantCode} onChange={addData} />
                                   <MotionFormErrorMessage>{validation?.errors.tenantCode}</MotionFormErrorMessage>
                                </FormControl>
                                <FormControl isRequired id="branch" sx={formControlInputSX} isInvalid={validation?.errors?.branch !== "" && validation?.touched.branch === "touched"}>
                                    <MotionFormLabel>Bank Branch</MotionFormLabel>

                                    <Input placeholder="Enter Bank Branch" borderRadius="4px" value={form.branch} onChange={addData} />
                                    <MotionFormErrorMessage>{validation?.errors.branch}</MotionFormErrorMessage>
                                </FormControl>
                                <FormControl isRequired id="location" sx={formControlInputSX} isInvalid={validation?.errors?.location !== "" && validation?.touched.location === "touched"}>
                                    <MotionFormLabel>Bank Locatoin</MotionFormLabel>
                                    <Select borderRadius="4px" value={form.location} onChange={addData} placeholder="Select a state">
                                        {states?.map((x, i) => <option key={i} value={x.id}>{x.name}</option>)}
                                    </Select>
                                    <MotionFormErrorMessage>{validation?.errors.location}</MotionFormErrorMessage>
                                </FormControl>
                                <FormControl isRequired id="address" flexGrow={2} width="100%" isInvalid={validation?.errors?.address !== "" && validation?.touched.address === "touched"}>
                                    <MotionFormLabel>Bank Address</MotionFormLabel>
                                    <Input placeholder="Enter Bank Address" borderRadius="4px" value={form.address} onChange={addData} />
                                    <MotionFormErrorMessage>{validation?.errors.address}</MotionFormErrorMessage>
                                </FormControl>
                                <FormControl isRequired id="logo" width="15%" flexGrow={1} isInvalid={validation?.errors?.logo !== "" && validation?.touched.logo === "touched"}>
                                    <MotionFormLabel>Upload a Bank Logo</MotionFormLabel>
                                    <Input placeholder="Enter Bank Address" ref={fileRef} borderRadius="4px" type="file" sx={{
                                        display: "none"
                                    }} border="dotted" onChange={addData} />
                                    <Button border="1px dashed" borderColor="brand.mutext-text" w="100%" bgColor="white" px="70px" py="9px" onClick={() => {
                                        if(fileRef.current){
                                            fileRef.current.click()
                                        }
                                    }}>
                                        <Flex gap="29px">
                                            <Image src={`${Images.imageUpload}`} h="46px" w="47px" />
                                            <Flex flexDir="column" gap="4px" justifyContent="center">
                                                <Text color="brand.muted-text" size="dropdown-text">Browse File</Text>
                                                <Text color="brand.muted-text" size="tiny-text">File format: JPG, PNG</Text>
                                            </Flex>
                                        </Flex>
                                    </Button>
                                    <MotionFormErrorMessage>{validation?.errors.logo}</MotionFormErrorMessage>
                                </FormControl>
                                <FormControl id="logo" w="25%" flexGrow={1} >
                                    <Box w="fit-content">
                                        {form.logo !== "" &&

                                            <><Badge pos="absolute" borderRadius="full"><CloseButton onClick={(e) => {
                                              
                                                const s = new Event('change');
                                                if(fileRef.current){
                                                    fileRef.current.value = ""
                                                    fileRef.current.addEventListener('change', addData)
                                                    fileRef.current.dispatchEvent(s)
                                                }
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
                                                <Flex flexDir="column" gap="25px" w={"475px"}>
                                                    <Flex w="100%" h="262px" flexDir="column" bgColor={"#F3F5F6"} gap="26px" borderRadius="6px">
                                                        <Skeleton speed={0} w="100%" h="26px" bgColor={institutionColorForm?.headerColor} />
                                                        <Flex flexDir="column" gap="39px" pl="26px" pr="20px">
                                                            <Flex gap="29px">
                                                                <Flex flexDir="column" gap="13px">
                                                                    {map(range(0, 3), (x) => <Skeleton key={x} speed={0} bgColor={institutionColorForm?.sidebarColour} w="92px" h="13px" borderRadius="8px" />)}
                                                                </Flex>
                                                                <Flex flexDir="column" gap="13px">
                                                                    {map(range(0, 4), (x) => <Skeleton key={x} speed={0} w="289px" bgColor="#E1E6ED" h="14px" borderRadius="8px" />)}
                                                                </Flex>
                                                            </Flex>
                                                            <Skeleton w="154px" h="53px" speed={0} alignSelf="flex-end" bgColor={institutionColorForm?.buttonColor} borderRadius="8px" />
                                                        </Flex>
                                                    </Flex>
                                                    <VStack spacing='8px'>
                                                        <AnimatedText color="muted-text" textAlign="left" w="100%">Enter the hex code or use the colour picker</AnimatedText>
                                                        <Flex bgColor="brand.muted-background" border={ typeof institutionColorValidation?.touched !== "undefined" && institutionColorValidation?.touched.headerColor === "touched" && !validateHexColor( institutionColorForm?.headerColor as string) ? "1px solid red" : "unset"} borderRadius="8px" w="100%" alignItems="center" px="12px" py="16px">
                                                            <Button bgColor={institutionColorForm?.headerColor} w="40px" h="16px" borderRadius="8px" onClick={
                                                                () => {
                                                                    if(headerColorRef.current){
                                                                        headerColorRef.current.click()
                                                                    }
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
                                                                    if(buttonColorRef.current){
                                                                        buttonColorRef.current.click()
                                                                    }
                                                                }
                                                            }>
                                                                <Input visibility="hidden" type="color" name="buttonColor" w="40px" ref={buttonColorRef} onChange={setButtonColor} h="16px" borderRadius="8px" value={institutionColorForm?.buttonColor} />
                                                            </Button>
                                                            <Input placeholder="Buttons & links colour eg. #04257F" border="0" value={institutionColorForm?.buttonColor} bgColor="brand.muted-background" onInput={setButtonColor} />
                                                            <PickerIcon />
                                                        </Flex>
                                                        <Text color="red">{typeof institutionColorValidation?.touched !== "undefined" && institutionColorValidation?.touched.buttonColor === "touched" && !validateHexColor( institutionColorForm?.buttonColor as string) ? "This hexcode is invalid" : ""}</Text>
                                                        <Flex bgColor="brand.muted-background" borderRadius="8px" w="100%" border={typeof institutionColorValidation?.touched !== "undefined" && institutionColorValidation?.touched.headerColor === "touched" && !validateHexColor( institutionColorForm?.sidebarColour as string) ? "1px solid red" : "unset"} alignItems="center" px="12px" py="16px">
                                                            <Button bgColor={institutionColorForm?.sidebarColour} w="40px" h="16px" borderRadius="8px" onClick={
                                                                () => {
                                                                    if(sidebarColourRef.current){
                                                                        sidebarColourRef.current.click()
                                                                    }
                                                                }
                                                            }>
                                                                <Input visibility="hidden" ref={sidebarColourRef} name="sidebarColour" onChange={setsidebarColour} type="color" w="40px" h="16px" borderRadius="8px" value={institutionColorForm?.sidebarColour} />
                                                            </Button>
                                                            <Input placeholder="Side menu & accents eg. #04257F" value={institutionColorForm?.sidebarColour} border="0" bgColor="brand.muted-background" onInput={setsidebarColour} />
                                                            <PickerIcon />
                                                        </Flex>
                                                        <Text color="red">{typeof institutionColorValidation?.touched !== "undefined" && institutionColorValidation?.touched.sidebarColour === "touched" && !validateHexColor( institutionColorForm?.sidebarColour as string) ? "This hexcode is invalid" : ""}</Text>
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
                </MotionModal>}
            </form>
            }

        </AnimatePresence>)
}

export default AddNewBank