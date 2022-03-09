import { CircularProgress } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { FC, useContext } from "react"
import useSWR from "swr"
import { appear, apperWithDimensions, delayChildren } from "../../animations"
import { Images } from "../../constants"
import { APIResponse } from "../../models"
import { AuthContext } from "../../providers"
import { AnimatedText, MotionFlex, MotionImage } from "../framer"

interface ActivateAccountProps {
    activationCode: string
}

const ActivateAccount: FC<ActivateAccountProps> = (props: ActivateAccountProps) => {
    const router = useRouter()
    const {token} = useContext(AuthContext)
    const url = props.activationCode
    const { data, error } = useSWR<APIResponse<any>>(url)


    return (
        <MotionFlex sx={{
            flexDir: "column",
            gap: "55px"
        }}
            initial="hide"
            animate="show"
            variants={delayChildren}>
            <MotionImage src={Images.onboardingSuccess} boxSize="134px" animate="show" initial="hide" variants={apperWithDimensions({ width: "134px", height: "134px" })} />
            {data && <><MotionFlex sx={{
                flexDir: "column",
                gap: "20px"
            }}
                variants={delayChildren}>
                <AnimatedText variant="card-header" size="card-header">Account Activation Complete</AnimatedText>
                <AnimatedText variant="">Your Account has been activated successfully</AnimatedText>
            </MotionFlex></>}

            {error && <AnimatedText sx={{ color: 'red' }}>Can't activate account</AnimatedText>}

            {!data && !error && <MotionFlex sx={{
                height: "100vh"
            }}
                initial="hide"
                animate="show"
                variants={appear}
            >
                <CircularProgress isIndeterminate color="brand.primary-blue" size="120px" sx={{
                    margin: "auto"
                }}
                />
            </MotionFlex>}
        </MotionFlex>
    )
}

export default ActivateAccount