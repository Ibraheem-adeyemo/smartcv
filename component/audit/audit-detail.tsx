import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from "@chakra-ui/react";
import React, { FC, useContext } from "react";
import { UserManagementModalNames } from "../../constants";
import { AuditContext } from "../../provider/audit-provider";

const AuditDetail: FC = () => {
    const { viewDetailsModal, toggleDetailsModal } = useContext(AuditContext)
    return <>
        {viewDetailsModal &&
            <Modal scrollBehavior="inside" size="xl" onClose={() => toggleDetailsModal(false) } isOpen={viewDetailsModal} isCentered>
                <ModalOverlay />
                <ModalContent bgColor="white" px="18px">
                    <ModalHeader>{UserManagementModalNames.addNewBank}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    </ModalBody>
                </ModalContent>
            </Modal>
        }
    </>

}
export default AuditDetail