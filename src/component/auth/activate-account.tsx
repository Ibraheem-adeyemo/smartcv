import { CircularProgress, Link } from "@chakra-ui/react"
import { FC } from "react"
import useSWR from "swr"
import { appear, appearWithDimensions, delayChildren } from "../../animations"
import { apiUrlsv1, CloseIcon, Images, links } from "../../constants"
import { APIResponse } from "../../models"
import { AnimatedCardHeader, AnimatedText, MotionFlex, MotionImage } from "../framer"

import NextLink from 'next/link'
import { activateAccountContainerSX } from "../../sx"
interface ActivateAccountProps {
    activationCode: string | null
}

const ActivateAccount: FC<ActivateAccountProps> = (props: ActivateAccountProps) => {
    // debugger
    // const router = useRouter()
    const url = `${apiUrlsv1.activateAccount}?token=${props.activationCode}`
    const { data, error } = useSWR<APIResponse<any>>(url)


    return (
        <MotionFlex sx={activateAccountContainerSX}
            initial="hide"
            animate="show"
            variants={delayChildren}>
            {data && <MotionImage src={Images.onboardingSuccess} boxSize="134px" animate="show" initial="hide" variants={appearWithDimensions({ width: "134px", height: "134px" })} />}
            {error && <CloseIcon boxSize="134px" />}
            {data && <MotionFlex sx={{
                flexDir: "column",
                gap: "20px"
            }}
                variants={delayChildren}>
                <AnimatedCardHeader variant="card-header" size="card-header">Account Activation Complete</AnimatedCardHeader>
                <AnimatedText variant="">Your Account has been activated successfully</AnimatedText>
            </MotionFlex>}

            {error && <MotionFlex sx={{
                flexDir: "column",
                gap: "20px"
            }}
                variants={delayChildren}>  <AnimatedCardHeader>Error in activatiing</AnimatedCardHeader>
                <AnimatedText sx={{ color: 'red' }}>Can't activate account</AnimatedText></MotionFlex>}

            {!data && !error && <MotionFlex sx={{
                height: "100vh"
            }}
                initial="hide"
                animate="show"
                variants={appear()}
            >
                <CircularProgress isIndeterminate color="brand.primary-blue" size="120px" sx={{
                    margin: "auto"
                }}
                />
                <Link px="201.5px" py="12px" variant="primary-link" href={links.login}>
                    <NextLink href={links.login}>Back to Login</NextLink>
                </Link>
            </MotionFlex>}
        </MotionFlex>
    )
}

export default ActivateAccount