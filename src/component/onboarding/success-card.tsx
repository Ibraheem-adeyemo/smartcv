import { Image, VStack, Text, Box, Link } from "@chakra-ui/react";
import { OnboardingCard } from ".";
import { Images, links } from "../../constants";
import NextLink from 'next/link'
import React, { FC } from "react";
import { AnimatedText, MotionFlex, MotionImage } from "../framer";
import { appearWithDimensions, delayChildren } from "../../animations";
import { AppLink } from "../app";

const SuccessCard: FC = () => {
    const cardTitle = <MotionFlex sx={{
        gap: "20px",
        flexDir: "column"
    }}
        animate="show"
        initial="hide"
        variants={delayChildren}
    >
        <MotionImage src={Images.onboardingSuccess} boxSize="134px" animate="show" initial="hide" variants={appearWithDimensions({width:"134px", height:"134px"})}  />
        <AnimatedText variant="card-header" size="extra-large-text" color="brand.success">Changes updated</AnimatedText>
    </MotionFlex>
    const cardFooter =  <AppLink px="50px" py="12px" variant="primary-link" href={links.login}>Back to Login</AppLink>
    return (
        <OnboardingCard cardTitle={cardTitle} cardFooter={cardFooter}>
            <Box as="span" >
                <AnimatedText>
                    <Text color="brand.success"> Your bank information and admin account has been successfully created!</Text>
                    An email has been sent to the bank admin
                </AnimatedText>
            </Box>
        </OnboardingCard>
    )
}

export default SuccessCard