import { Button, CircularProgress, Link } from "@chakra-ui/react"
import { FC, useEffect, useState } from "react"
import useSWR from "swr"
import { appear, appearWithDimensions, delayChildren, staggerChildren, staggerChildrenWithDuration, verticalPosition } from "../../animations"
import { apiUrlsv1, CloseIcon, Images, links } from "../../constants"
import { APIResponse } from "../../models"
import { AnimatedCardHeader, AnimatedText, MotionBox, MotionButton, MotionFlex, MotionImage } from "../framer"

import NextLink from 'next/link'
import { activateAccountContainerSX, loginButtonSX, loginFormContainerSX } from "../../sx"
import { AppLink } from "../app"
interface ActivateAccountProps {
    activationCode: string | null
}

const ActivateAccount: FC<ActivateAccountProps> = (props: ActivateAccountProps) => {
    // debugger
    // const router = useRouter()
    const url = `${apiUrlsv1.activateAccount}?token=${props.activationCode}`
    const { data, error } = useSWR<APIResponse<any>>(url)
    const [extraMessage, setExtraMessage] = useState("")
    useEffect(() => {
        if(error && typeof error === "string" && error.toLowerCase() === "token is expired" ) {
            setExtraMessage("login to resend activation mail")
        } else {
            setExtraMessage("")
        }
    },[error])
    return (
        <>

            <MotionFlex sx={loginFormContainerSX}
                initial="hide"
                animate="show"
                variants={staggerChildrenWithDuration}
            >

                {data && <MotionImage src={Images.onboardingSuccess} boxSize="167px" animate="show" initial="hide" variants={appearWithDimensions({ width: "134px", height: "134px" })} />}
                {error && <CloseIcon boxSize="134px" />}
                <MotionBox
                    sx={{
                        overflow: "hidden",
                        display: "inline-block"
                    }}

                    animate="show"
                    initial="hide"
                    variants={staggerChildren}
                >
                    <MotionBox
                        sx={{
                            display: "inline-block"
                        }}
                        initial="hide"
                        animate="show"
                        variants={verticalPosition}
                    >
                        {data && <AnimatedText variant="card-header" size="page-header" >Account Activated</AnimatedText>}
                        {error && <AnimatedText variant="card-header" size="page-header" >{error} {extraMessage}</AnimatedText>}
                        {!data && !error && <CircularProgress isIndeterminate color="brand.primary-blue" size="120px" sx={{
                            margin: "auto"
                        }}
                        />}
                    </MotionBox>
                </MotionBox>
                <MotionBox
                    sx={{
                        overflow: "hidden",
                        display: "inline-block"
                    }}
                    variants={staggerChildrenWithDuration}
                >
                    <MotionFlex sx={{
                        flexDir: "column",
                        gap: "8px"
                    }}

                        initial="hide"
                        animate="show"
                        variants={verticalPosition}
                    >
                        <Button as={AppLink} href={links.login} variant="primary-button" sx={loginButtonSX}>
                            Back to Login
                        </Button>
                    </MotionFlex>
                </MotionBox>
            </MotionFlex>
        </>)
}

export default ActivateAccount