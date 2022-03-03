import { Image, VStack, Text, Box, Link } from "@chakra-ui/react";
import { OnboardingCard } from ".";
import { Images, links } from "../../constants";
import NextLink from 'next/link'
import React, { FC } from "react";
import { AnimatedText, MotionFlex, MotionImage } from "../framer";

const SuccessCard: FC = () => {
    const cardTitle = <MotionFlex sx={{
        gridGap: "20px",
        flexDir: "column"
    }}
        animate="show"
        initial="hide"
        variants={{
            show: {
                opacity:1,
                transition: {
                    delayChildren: 0.4
                }
            },
            hide: {
                opacity: 0
            }
        }}
    >
        <MotionImage src={Images.onboardingSuccess} boxSize="134px" animate="show" initial="hide" variants={{
            show: {
                opacity: 1,
                height: "134px",
                width: "134px",
                transition: {
                    duration: 0.4
                }
            },
            hide: {
                opacity:0,
                height: 0,
                width: 0
            }
        }}  />
        <AnimatedText variant="card-header" size="extra-large-text" color="brand.success">Changes updated</AnimatedText>
    </MotionFlex>
    const cardFooter = <Link px="201.5px" py="12px" variant="primary-link" href={links.login}>
        <NextLink href={links.login}>Back to Login</NextLink>
    </Link>
    return (
        <OnboardingCard cardTitle={cardTitle} cardFooter={cardFooter}>
            <Box as="span" >
                <AnimatedText size="card-header">
                    <Text color="brand.success"> Your bank information and admin account has been successfully created!</Text>
                    An email has been sent to the bank’s super admin
                </AnimatedText>
            </Box>
        </OnboardingCard>
    )
}

export default SuccessCard