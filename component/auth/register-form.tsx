import { Flex, Link } from "@chakra-ui/layout";
import { Text, Button, FormControl, FormLabel, Input, useToast, forwardRef } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { API_BASE_URL, CURRENT_API_VERSION, links, notificationMesage } from "../../constants";
import NextLink from 'next/link'
import { fetchJson, setCookie } from "../../lib";
import { InterchangeResponse, Loading } from "../../models";
import useLoading from "../../hooks/loading";
import { getInterchangeById } from "../../services/v1";
import { AppLink } from "../app";

export default function RegisterForm(props: any) {

    const router = useRouter()
    const [interChangeId, setInterChangeId] = useState<string>()
    const toast = useToast()
    const [loading, setLoading] = useLoading()
    const getInterChangebyInterchangeId = async () => {
        try {
            // debugger
            setLoading({ isLoading: true, text: "Confirming" })
            const data = await getInterchangeById(interChangeId as string)
            if (typeof data.statusCondition !== "undefined" && +data.statusCondition === 1 && typeof interChangeId !== "undefined") {
                // debugger
                setCookie("interchangeId", interChangeId, 15)
                toast({
                    status: "success",
                    title: notificationMesage.SuccessfulLogin,
                    isClosable: true,
                    variant: "left-accent"
                })
                router.push(links.onboarding)
                return
            } else if (typeof data.statusCondition !== "undefined") {
                throw {
                    data
                }
            } else {
                throw new Error(notificationMesage.AnErrorOccurred)
            }
        } catch (error: any) {
            console.error({ getInterChangebyInterchangeIdError: error })
            if (typeof error.message !== "undefined" || typeof error !== "undefined") {
                toast({
                    status: "error",
                    title: typeof error.message === "undefined" ? error : error.message,
                    isClosable: true,
                    variant: "left-accent"
                })
            }
            setLoading({ isLoading: false, text: "" })
        }
    }
    return (
        <form method="POST" onSubmit={((e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault(), getInterChangebyInterchangeId()
        })}>
            <Flex flexDir="column" gridGap="36px" px="66px" bg="white" borderRadius="6px" alignItems="center" w="633px" py="36px">
                <Text variant="card-header" size="page-header" >Register</Text>
                <FormControl id="organizationId">
                    <FormLabel>Organization ID</FormLabel>
                    <Input placeholder="XYZ1278IO" borderRadius="4px" onInput={(e) => {
                        e.stopPropagation()
                        const ele = e.target as HTMLInputElement
                        setInterChangeId(ele.value)
                    }} />
                </FormControl>
                <Flex flexDir="column" gridGap="15px" w="100%" alignItems="center">
                    <Button isLoading={loading.isLoading} loadingText={loading.text} type="submit" variant="primary-button" w="100%" py="12px">
                        Submit
                    </Button>
                    <AppLink href={links.login} color="brand.primary-blue" >Back to Login</AppLink>
                </Flex>
            </Flex>
        </form>)
}