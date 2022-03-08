import { Modal, ModalBody, ModalCloseButton, ModalContent, Text, ModalOverlay, Button, Flex } from "@chakra-ui/react";
import { FC, useContext } from "react";
import { InterchangeDisconnectionContext } from "../../providers";
import { AppCard } from "../app";

const RequestConnectionModal: FC = () => {

    const {showReconnectionRequestModal, triggerReconnectionRequestModal} = useContext(InterchangeDisconnectionContext)

    return <Modal scrollBehavior="inside" size="xl" onClose={() => triggerReconnectionRequestModal(false)} isOpen={showReconnectionRequestModal} isCentered>
        <ModalOverlay />
        <ModalContent bgColor="white" px="18px">
            <ModalCloseButton />
            <ModalBody>
                <AppCard topic={"Request Reconnection"}>
                    <Text>Are you sure you want to request reconnection?</Text>

                    <Flex>
                        <Button bgColor={"white"} px="53px" py="8px"  >Request Connection</Button>
                        <Button variant="primary-button" px="53px" py="8px"  >Proceed</Button>
                    </Flex>

                </AppCard>
            </ModalBody>
        </ModalContent>
    </Modal>
}

export default RequestConnectionModal