import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure } from '@chakra-ui/react'

interface BasicModalProps {
    children: React.ReactNode,
    title: string,
    isOpen: boolean,
    onClose: ()=>void
    //onOpen: ()=>{}
}
function BasicModal(props: BasicModalProps) {
    const {children, title, onClose, isOpen} = props;
    return (
      <>
        {/* <Button onClick={onOpen}>Open Modal</Button> */}
  
        <Modal isOpen={isOpen} size='4xl' onClose={onClose}>
          <ModalOverlay /> 
          <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {children}
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='ghost'>Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

export default BasicModal;
