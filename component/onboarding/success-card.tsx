import { Image, VStack, Text, Box, Link } from "@chakra-ui/react";
import { OnboardingCard } from ".";
import { Images, links } from "../../constants";
import NextLink from 'next/link'
import React, { FC } from "react";

const SuccessCard:FC =() => {
    const cardTitle = <VStack spacing="20px">
        <Image src={Images.onboardingSuccess} boxSize="134px" />
        <Text variant="card-header" size="extra-large-text" color="brand.success">Changes updated</Text>
    </VStack>
    const cardFooter = <Link px="201.5px" py="12px" variant="primary-link" href={links.login}>
        <NextLink href={links.login}>Back to Login</NextLink>
    </Link>
    return (
        <OnboardingCard cardTitle={cardTitle} cardFooter={cardFooter}>
            <Box as="span" >
                <Text size="card-header">
                    <Text color="brand.success"> Your bank information and admin account has been successfully created!</Text>
                    An email has been sent to the bank’s super admin
                </Text>
            </Box>
        </OnboardingCard>
    )
}

export default SuccessCard