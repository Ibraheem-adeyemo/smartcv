import { Table, TableContainer, Thead, Tbody, Td, Tr, Th } from "@chakra-ui/react";
import { TransactionMonitoringTableProps } from "../../models";

const TransactionMonitoringTable = (props:TransactionMonitoringTableProps) => {
    const { records } = props
    return (
        <TableContainer>
            <Table>
                <Thead>
                    <Th>Date</Th>
                    <Th>MSS Type</Th>
                    <Th>TRANC TYPE</Th>
                    <Th>PAN</Th>
                    <Th>STAN</Th>
                    <Th>Amount(N)</Th>
                    <Th>REF CODE</Th>
                </Thead>
                <Tbody>
                    {
                        records.length > 0 ? records.map((record, i) => {
                            return (<Tr key={1+i*Math.random()}>
                                <Td>{record.date}</Td>
                                <Td>{record.MSSType}</Td>
                                <Td>{record.transactionType}</Td>
                                <Td>{record.pan}</Td>
                                <Td>{record.date}</Td>
                                <Td>{record.amount}</Td>
                                <Td>{record.refCode}</Td>
                            </Tr>)
                        }) : <p>The data is not available now.</p>
                    }
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default TransactionMonitoringTable;
