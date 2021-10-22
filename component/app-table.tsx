import { Icon, Menu, MenuButton, MenuItem, MenuList, Thead } from "@chakra-ui/react";
import { Table, Tbody, Td, Tr } from "@chakra-ui/table";
import React, { useMemo } from "react";
import { IoEllipsisVerticalOutline } from 'react-icons/io5'
interface Column {
    name: string,
    key: string
}

type performAction = () => void

interface Action {
    name: string,
    method: performAction
}

interface ApptableProps {
    columns: Column[],
    rows: any[],
    actions: Action[] | []
}

export default function AppTable(props: ApptableProps) {

    return (
        <Table>
            <Thead>
                <Tr>
                    {props.columns.map((x, i) => <Td key={i} >{x.name}</Td>)}
                </Tr>
            </Thead>
            <Tbody>
                {props.rows.map((x, i) => <Tr>

                    {
                        props.columns.map((y, j) => <Td key={j}>
                            {
                                x[y?.key]
                            }
                        </Td>)}
                    {

                        props.actions.length > 1 && <Td>
                            <Menu>
                                <MenuButton as={IoEllipsisVerticalOutline} />
                                <MenuList>

                                    {
                                        props.actions.map((z, k) => <MenuItem key={k}>{z.name}</MenuItem>)
                                    }
                                </MenuList>
                            </Menu>
                        </Td>

                    }{
                        props.actions.length === 1 && <Td>{props.actions[0].name}</Td>
                    }


                </Tr>)}
            </Tbody>
        </Table>)
}