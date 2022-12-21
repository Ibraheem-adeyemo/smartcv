import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Table, Tr, Td, Flex } from "@chakra-ui/react";
import React, { FC, useContext } from "react";
import { apiUrlsv1, API_BASE_URL, UserManagementModalNames } from "../../constants";
import { ATMCount, ATMStats, AuditView } from "../../models";
import { AuditContext } from "../../providers";
const mapData = function <T>(objString: string): T {
    try {
        const parsedString = JSON.parse(objString)
        let returnValue = {} as T
        switch (true) {
            case 'body' in parsedString:
                const { body } = parsedString
                returnValue = body
                if ('data' in body) {
                    const { data } = body
                    returnValue = data
                    if ('content' in data) {
                        returnValue = data.content
                    }
                }
                return returnValue
            case 'list' in parsedString:
                const { list } = parsedString
                returnValue = list
                return returnValue
            case 'content' in parsedString:
                returnValue = parsedString.content
                return returnValue
            default:
                returnValue = {} as T
                return returnValue
        }
    } catch (error) {
        throw error
    }
}
interface DataArrayViewProps {
    data: any
}

const DataArrayView = <T extends Record<keyof T, T[keyof T]>>(props: DataArrayViewProps) => {
    return (
        <Flex>
            {(props.data).map((x: T, i: number) =>

                <Table key={i}>
                    {
                        (() => {
                            let ui
                            let j = 0
                            for (const key in x) {
                                j++
                                const usedKey = key as keyof (T)
                                ui = <Tr key={i}>
                                    <Td>{key}:</Td>
                                    <Td>{x[usedKey]}</Td>
                                </Tr>
                            }
                            return ui
                        })()
                    }

                </Table>
            )
            }
        </Flex>
    )
}

const DataObjectView = <T extends Record<keyof T, T[keyof T]>>(props: DataArrayViewProps) => {
    return (
        <Flex>
            <Table>
                {
                    (() => {
                        let ui
                        let k = 0
                        for (const key in props.data) {
                            k++
                            const usedKey = key as keyof (T)
                            ui = <Tr key={k}>
                                <Td>{key}:</Td>
                                <Td>{props.data[usedKey]}</Td>
                            </Tr>
                        }
                        return ui
                    })()
                }
            </Table>
        </Flex>
    )
}
interface ResponseViewProps {
    auditInfo: AuditView
}
const ResponseView = (props: ResponseViewProps) => {
    switch (`${API_BASE_URL}${props.auditInfo.uri}`) {
        case apiUrlsv1.atmCount:
            return (
                <DataArrayView<ATMCount> data={mapData<ATMCount[]>(props.auditInfo.response)} />
            )
        case apiUrlsv1.atmStats:
            return (<DataArrayView<ATMStats> data={mapData<ATMStats[]>(props.auditInfo.response)} />)
        default:
            return <></>
    }
}

const AuditDetail: FC = () => {
    const { viewDetailsModal, toggleDetailsModal, auditInfo } = useContext(AuditContext)
    return <>
        {viewDetailsModal &&
            <Modal scrollBehavior="inside" size="xl" onClose={() => toggleDetailsModal(false)} isOpen={viewDetailsModal} isCentered>
                <ModalOverlay />
                <ModalContent bgColor="white" px="18px">
                    <ModalHeader>{UserManagementModalNames.addNewBank}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Accordion defaultIndex={[0]} allowMultiple>
                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box flex='1' textAlign='left'>
                                            Request
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>

                                    {typeof auditInfo !== "undefined" && <pre>
                                        {JSON.stringify(JSON.parse(auditInfo.arguments))}
                                    </pre>
                                    }
                                </AccordionPanel>
                            </AccordionItem>

                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box flex='1' textAlign='left'>
                                            Response
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    {typeof auditInfo !== "undefined" && <ResponseView auditInfo={auditInfo} />}
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </ModalBody>
                </ModalContent>
            </Modal>
        }
    </>

}
export default AuditDetail