import { Icon, Menu, MenuButton, MenuItem, MenuList, Tfoot, Thead, Button } from "@chakra-ui/react";
import { Table, Tbody, Td, Tr } from "@chakra-ui/table";
import React, { useContext, useEffect, useMemo } from "react";
import { IoEllipsisVerticalOutline } from 'react-icons/io5'
import { AppTableFooter } from ".";
import { usePagination } from "../hooks";
import { TableContext } from "../provider/table-provider";
import bankAdmin from "./user-management/bank-admin";
interface Column {
    name: string,
    key: string
}

type performAction = () => void

interface Action {
    name: string,
    method: performAction
}

interface ApptableProps<T extends Record<keyof T, k>, k> {
    columns: Column[],
    rows: T[],
    actions: Action[] | []
}

export default function AppTable<T extends Record<keyof T, K>, K>(props: ApptableProps<T, K>) {

    const { pageNumber, countPerPage, totalPageNumber, changeCountPerPage, incrementPageNumber, decrementPageNumber, gotoPage, setPaginationProps } = useContext(TableContext)
    // console.log({rows: props.rows})
    
    return (
        <Table>
            <Thead>
                <Tr bgColor="#F8F9FF">
                    {props.columns?.map((x, i, arr) => <Td fontSize="13px" py="19px" key={i} borderTopLeftRadius={i ===0?"6px":"unset"} borderTopRightRadius={ (i+1) === arr.length && props.actions.length === 0?"6px":"unset"} >{x.name}</Td>)}
                    {props.actions.length > 0 && <Td borderTopRightRadius="6px"></Td>}
                </Tr>
            </Thead>
            <Tbody>
                {props.rows?.map((x:T, i) => <Tr key={i}>

                    {
                        props.columns.map((y, j) => {
                        const columns = (y.key).split(",") as (keyof T)[];
                        let data = x[columns[0]]
                        if(columns.length > 1) {

                            // debugger
                           data = columns.reduce((acc: unknown, curr) => acc === ""? x[curr]: acc + " " + x[curr], "") as T[keyof T]
                        }
                        return <Td  fontSize="13px" py="19px" key={j}>
                            {
                                data
                            }
                        </Td>
                    })}
                    {

                        props.actions.length > 1 && <Td>
                            <Menu>
                                <MenuButton as={Button} bgColor="white">
                                    <Icon as={IoEllipsisVerticalOutline} />
                                </MenuButton>
                                <MenuList>

                                    {
                                        props.actions.map((z, k) => <MenuItem key={k} onClick={z.method}>{z.name}</MenuItem>)
                                    }
                                </MenuList>
                            </Menu>
                        </Td>

                    }
                    {
                        props.actions.length === 1 && <Td><Button bgColor="white" _hover={{bgColor:"white"}} onClick={props.actions[0].method}>{props.actions[0].name}</Button></Td>
                    }
                </Tr>)}
            </Tbody>
            <Tfoot>
                <Tr>
                    <Td borderBottomRadius="6px" fontSize="13px" pt="25px" pb="25px" colSpan={props.columns.length}>
                        <AppTableFooter />
                    </Td>
                </Tr>
            </Tfoot>
        </Table>
    )
}