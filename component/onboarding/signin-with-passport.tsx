import { Modal, ModalOverlay, ModalContent, ModalBody, ModalHeader, ModalCloseButton, Button, ModalFooter, Flex, FormControl, FormErrorMessage, FormLabel, Input, Text, toast, useToast } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { CLIENT_ID, PASSPORT_AUTHORIZE_URL, PASSPORT_TOKEN_URL, SCOPE, SECRET } from "../../constants";
import { useForm, useValidator } from "../../hooks";
import { Loading, PassportLoginCredentials, SuperAdminInfo } from "../../models";

type onClose = () => void
const voidfunc = () => {

}
type SetUserAuthority = (superAdmin: SuperAdminInfo) => void
interface SigninWithPassportProps {
    openModal: boolean,
    onCloseModal: onClose,
    setUserAuthority: SetUserAuthority
}
const initialLogin: PassportLoginCredentials = {
    email: "",
    password: ""
}
export default function SigninWithPassport(props: SigninWithPassportProps) {
    const { form, setForm } = useForm<PassportLoginCredentials>(initialLogin)
    const { validation, setData, setField } = useValidator<PassportLoginCredentials>()
    const [canNotSubmit, setCanNotSubmit] = useState<boolean>()
    const [spin, setSpin] = useState<Loading>()
    const toast = useToast()

    const confirmUser = async () => {
        setSpin({
            text: "Authentitcating",
            isLoading: true
        } as Loading)
        try {
            if (form?.completed) {
                const body = {
                    grant_type: "password",
                    username: form.email,
                    password: form.password,
                    scope: SCOPE
                }
                // export const PASSPORT_URL = "".concat(
                //     PASSPORT_AUTHORIZE_URL,
                //     "?",
                //     "client_id=",
                //     CLIENT_ID,
                //     "&redirect_uri=",
                //     REDIRECT_URI,
                //     "&scope=",
                //     SCOPE,
                //     "&response_type=",
                //     RESPONSE_TYPE
                //   );

                // const report = await fetch(PASSPORT_AUTHORIZE_URL)
                const response = await fetch(form?.postUrl as string, {
                    method: "post",
                    headers: {
                        Authorixation: `Basic ${btoa(CLIENT_ID + ':' + SECRET)}`,
                        contentType: "application/json"
                    },
                    body: JSON.stringify(body)
                })
                const data = (await response.json()) as SuperAdminInfo
                if (response.ok || response.status === 200 || response.status === 201) {
                    props.setUserAuthority(data)
                } else {
                    throw {
                        ...new Error(response.statusText),
                        response,
                        data
                    }
                }
            }
            setSpin({
                text: "",
                isLoading: false
            } as Loading)
        } catch (error: any) {
            if (typeof error.data !== "undefined") {
                toast({
                    title: error.error_description,
                    variant: "left-accent",
                    isClosable: true,
                    status: "error"
                })
            } else if (typeof error.message !== "undefined") {
                toast({
                    title: error.message,
                    variant: "left-accent",
                    isClosable: true,
                    status: "error"
                })
            } else {
                toast({
                    title: error,
                    variant: "left-accent",
                    isClosable: true,
                    status: "error"
                })
            }
            setSpin({
                text: "",
                isLoading: false
            } as Loading)
        }

    }

    useEffect(() => {
        if (typeof canNotSubmit !== "undefined") {
            if (!canNotSubmit) {
                debugger
                console.log({ PASSPORT_TOKEN_URL })
                setForm(prev => ({
                    ...prev as PassportLoginCredentials,
                    postUrl: PASSPORT_TOKEN_URL,
                    completed: true
                }))
            } else {

            }
        }
    }, [canNotSubmit])

    useEffect(() => {
        setData(form)
        // debugger
        if (typeof form !== "undefined") {
            const data = Object.keys(initialLogin).map(x => form[(x as keyof PassportLoginCredentials)])
            const filteredData = data.filter(x => x === "").length
            if (filteredData > 0) {
                setCanNotSubmit(true)
            } else if (filteredData === 0) {
                setCanNotSubmit(false)
            }

        } else {
            setCanNotSubmit(true)
        }

    }, [form, setForm])

    const addData = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation()
        // debugger
        const ele = (e.target as HTMLInputElement | HTMLSelectElement)
        setField(ele.id as keyof PassportLoginCredentials)
        const value = ele.value
        setField(ele.id as keyof PassportLoginCredentials)
        setForm(prev => ({
            ...prev as PassportLoginCredentials,
            [ele.id]: value
        }))
    }, [])

    return (

        <Modal isOpen={typeof props.openModal !== "undefined" ? props.openModal : false} onClose={typeof props.onCloseModal !== "undefined" ? props.onCloseModal : voidfunc}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Login with your Interswitch Passport Account</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Use your Interswitch Passport account to create super admin</Text>
                    <Flex gridGap="32px" flexDir="column" >
                        <FormControl isRequired id="email" width="100%" isInvalid={validation?.errors?.email !== "" && validation?.touched.email === "touched"}>
                            <FormLabel>email</FormLabel>

                            <Input placeholder="janedoe@gmail.com" type="email" borderRadius="4px" value={form?.email} onChange={addData} />
                            {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                            <FormErrorMessage>{validation?.errors.email}</FormErrorMessage>
                        </FormControl>
                        <FormControl isRequired id="password" width="100%" isInvalid={validation?.errors?.password !== "" && validation?.touched.password === "touched"}>
                            <FormLabel>Last name</FormLabel>
                            <Input placeholder="Enter your password" type="password" borderRadius="4px" value={form?.password} onChange={addData} />
                            <FormErrorMessage>{validation?.errors.password}</FormErrorMessage>

                            {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                        </FormControl>
                    </Flex>
                </ModalBody>

                <ModalFooter d="flex" w="100%" justifyContent="right" gridGap="20px" >
                    <Button variant="muted-primary-button" px="45px" py="8px" onClick={typeof props.onCloseModal !== "undefined" ? props.onCloseModal : voidfunc} >Cancel</Button>
                    <Button variant="primary-button" px="75px" py="8px" disabled={typeof canNotSubmit !== "undefined" ? canNotSubmit : true} isLoading={spin?.isLoading} loadingText={typeof spin?.text === "undefined" ? "loading" : spin.text} onClick={confirmUser}>Next</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
