import { ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalCloseButton, ModalBody, Flex, HStack, Button } from "@chakra-ui/react"
import { FC, ReactNode } from "react"
import { appear } from "../../animations"
import { Images, UserManagementModalNames } from "../../constants"
import { BankModalProps } from "../../models"
import { AnimatedText, MotionFlex, MotionImage } from "../framer"
import { MotionModal } from "../framer/motion-modal"

interface BankViewProps extends BankModalProps {
    actionButton?: ReactNode
}

const BankView: FC<BankViewProps> = ({ actionButton = <></>, ...props}: BankViewProps) => {

    return (
        <MotionModal
            isOpen={props.isOpen}
            exit="hide"
            animate="show"
            initial="hide"
            variants={appear()} scrollBehavior="inside" size="xl"
            onClose={() => props.closeModal()} isCentered>
            <ModalOverlay />
            <ModalContent bgColor="white" px="18px">
                <ModalHeader>{UserManagementModalNames.viewBank}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <MotionFlex animate="show" initial="hide" variants={appear(1)} gap={"46px"} flexDir="column">
                        <Flex gap={"46px"} alignItems="center">
                            <MotionImage sx={{
                                height: "45px",
                                width: "auto"
                            }}
                                initial="hide"
                                animate="show"
                                variants={appear()}
                                src={!props.bankInfo?.image ? Images.defaultCompanyLogo : "data:image/jpg;base64," + props.bankInfo.image} onError={() => Images.defaultCompanyLogo} />
                            <AnimatedText variant="card-header" size="page-size">
                                {props.bankInfo?.name}
                            </AnimatedText>
                        </Flex>
                        <Flex gap={"46px"} alignItems="center">
                            <MotionFlex gap="13px" flexDir={"column"}>
                                <AnimatedText>Bank Code</AnimatedText>
                                <AnimatedText variant="card-header" size="page-size">
                                    {props.bankInfo?.code}
                                </AnimatedText>
                            </MotionFlex>
                            <MotionFlex gap="13px" flexDir={"column"}>
                                <AnimatedText>Address</AnimatedText>
                                <AnimatedText variant="card-header" size="page-size">
                                    {props.bankInfo?.address}
                                </AnimatedText>
                            </MotionFlex>
                        </Flex>
                        <Flex gap={"46px"} alignItems="center">
                            <MotionFlex gap="13px" flexDir={"column"}>
                                <AnimatedText>Bank Color</AnimatedText>
                                <AnimatedText variant="card-header" size="page-size">
                                    None
                                </AnimatedText>
                            </MotionFlex>
                            <MotionFlex gap="13px" flexDir={"column"}>
                                <AnimatedText>Status</AnimatedText>
                                <AnimatedText variant="card-header" size="page-size">
                                    {props.bankInfo && +props.bankInfo.active ? "Active" : "Not Active"}
                                </AnimatedText>
                            </MotionFlex>
                        </Flex>
                    </MotionFlex>
                </ModalBody>
                <ModalFooter>
                    <HStack justifyContent="right" spacing="20px" pt="100px">
                        <Button variant="muted-primary-button" px="45px" py="8px" onClick={() => props.closeModal()}>Cancel</Button>
                        {
                            actionButton
                        }
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </MotionModal>
    )
}

export default BankView