import { Flex, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react"
import { FC, MouseEvent, useCallback } from "react"
import { appear, staggerChildrenWithDuration } from "../../animations"
import { links, notificationMesage } from "../../constants"
import { useLoading } from "../../hooks"
import { onCloseFunc, TenantAdminView } from "../../models"
import { sendUserActivationMail } from "../../services/v1"
import { AppLink } from "../app"
import { AnimatedText, MotionButton, MotionFlex } from "../framer"
import { MotionModal } from "../framer/motion-modal"

interface ActivateUserProps {
    isOpen: boolean,
    closeModal: onCloseFunc,
    isLoggedIn: boolean,
    user?: TenantAdminView,
    email?: string
}

const ResendUserActivationMail: FC<ActivateUserProps> = (props: ActivateUserProps) => {
    const [loading, setLoading] = useLoading({ isLoading: false, text: "" })
    const toast = useToast()
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )

    const sendEmailActivation = useCallback(async (e: MouseEvent<HTMLButtonElement>) => {
        try {
            setLoading({isLoading: true, text: "resending email"})
            const email = props.isLoggedIn && props.user ? props.user.email : !props.isLoggedIn && props.email ? props.email : ""
            sendUserActivationMail(email)
        } catch (error:any) {
            toast({
                status: "error",
                title: error? error.message?error.message : error: `${notificationMesage.Oops} ${notificationMesage.AnErrorOccurred}`,
                isClosable: true,
                variant: "left-accent"
            })
        }
        setLoading({isLoading: false, text: ""})
    }, [])

    return (
            <MotionModal size={"fit-content"} isCentered isOpen={props.isOpen} onClose={() => {
                if (props.isLoggedIn && props.user) {
                    props.closeModal()
                } else {
                    void (0)
                }
            }}>
                {!props.isLoggedIn && <OverlayOne />}
                {props.isLoggedIn && <ModalOverlay />}
                <ModalContent width={"fit-content"}>
                    {!props.isLoggedIn && <ModalHeader><AnimatedText>Resend activation mail for your account</AnimatedText></ModalHeader>}
                    {props.isLoggedIn && props.user && <ModalHeader><AnimatedText>Resend activation mail for {props.user.email}</AnimatedText></ModalHeader>}
                    {props.isLoggedIn && <ModalCloseButton />}
                    <ModalBody>
                        {!props.isLoggedIn && <AnimatedText>You can not access this feature because you have not activated your account</AnimatedText>}
                        {props.isLoggedIn && <MotionFlex variants={staggerChildrenWithDuration}>

                        </MotionFlex>}
                    </ModalBody>
                    <ModalFooter>
                        <Flex gap="10px" flexWrap="wrap">
                        {props.isLoggedIn && props.user && <MotionButton initial="hide" animate="show" variants={appear(0)} variant="muted-primary-button" px="45px" py="8px" onClick={() => props.closeModal()}>Cancel</MotionButton>}
                        <AppLink py="8px" variant="primary-button" href={links.login}><AnimatedText>Back to Login</AnimatedText></AppLink>
                        <MotionButton initial="hide" animate="show" variants={appear(0)} variant="primary-button" px="115px" py="8px" isLoading={loading?.isLoading} loadingText={typeof loading?.text === "undefined" ? "loading" : loading.text} onClick={sendEmailActivation}>Save</MotionButton>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </MotionModal>
    )
}


export default ResendUserActivationMail