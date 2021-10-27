import { Flex, Link } from "@chakra-ui/layout";
import { Text, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, {  } from "react";
import { links } from "../constants";
import NextLink from 'next/link'

export default function RegisterForm(props: any) {
    const router = useRouter()
    return (
        <form method="POST" onSubmit={((e: React.FormEvent<HTMLFormElement>) => (
            e.preventDefault(),
            router.push('/onboarding')
        ))}>
            <Flex flexDir="column" gridGap="36px" px="66px" bg="white" borderRadius="6px" alignItems="center" w="633px" py="36px">
                <Text variant="card-header" size="page-header" >Register</Text>
                <FormControl id="organizationId">
                    <FormLabel>Organization ID</FormLabel>
                    <Input placeholder="XYZ1278IO" borderRadius="4px" />
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                </FormControl>
                <Flex flexDir="column" gridGap="15px" w="100%" alignItems="center">
                    <Button type="submit" variant="primary-button" w="100%" py="12px">
                        Submit
                    </Button>
                    <Link href={links.login} color="brand.primary" ><NextLink href={links.login}>Back to Login</NextLink></Link>
                </Flex>
            </Flex>
        </form>)
}