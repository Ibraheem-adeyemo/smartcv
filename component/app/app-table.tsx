import { Icon, Menu, MenuButton, MenuItem, MenuList, Tfoot, Thead, Button, Image, HStack, Text } from "@chakra-ui/react";
import { Table, Tbody, Td, Tr } from "@chakra-ui/table";
import _ from "lodash";
import dynamic from "next/dynamic";
import React, { useContext } from "react";
import { IoEllipsisVerticalOutline } from 'react-icons/io5'
import { DotIcon, Images } from "../../constants";
import { TableContext } from "../../provider/table-provider";
import SkeletonLoader from "../skeleton-loader";
interface Column {
    name: string,
    key: string,
    ele?: string
}

type performAction = () => void

interface Action {
    name: string,
    method: performAction
}

interface ApptableProps<T extends Record<keyof T, T[keyof T]>> {
    columns: Column[],
    rows: T[],
    actions?: Action[]
}

const AppTableFooter = dynamic(() => import('../app/app-table-footer'))

export default function AppTable<T extends Record<keyof T, T[keyof T]>>(props: ApptableProps<T>) {

    const { pageNumber, countPerPage, totalPageNumber, changeCountPerPage, incrementPageNumber, decrementPageNumber, gotoPage, setPaginationProps } = useContext(TableContext)
    // console.log({rows: props.rows})

    return (
        <Table>
            <Thead>
                <Tr bgColor="#F8F9FF">
                    {props.columns?.map((x, i, arr) => <Td fontSize="13px" py="19px" key={i} borderTopLeftRadius={i === 0 ? "6px" : "unset"} borderTopRightRadius={(i + 1) === arr.length && typeof props.actions !== "undefined" && props.actions.length === 0 ? "6px" : "unset"} >{x.name}</Td>)}
                    {(typeof props.actions !== "undefined" && props.actions.length > 0) && <Td key={props.actions.length} borderTopRightRadius="6px"></Td>}
                </Tr>
            </Thead>
            <Tbody>
                {props.rows?.map((x: T, i) => <Tr key={i}>

                    {
                        props.columns.map((y, j) => {
                            const columns = (y.key).split(",") as (keyof T)[];
                            let data = x[columns[0]]
                            if (columns.length > 1) {

                                // debugger
                                data = columns.reduce((acc: unknown, curr) => acc === "" ? x[curr] : acc + " " + x[curr], "") as T[keyof T]
                            }
                            return <Td fontSize="13px" py="19px" key={j}>
                                {
                                    ((data) => {
                                        if (typeof y.ele !== "undefined" && y.ele !== "") {
                                            switch (y.ele) {
                                                case "image":
                                                    return <Image src={ typeof data === "undefined" || data===null? Images.defaulyCompanyLogo : "data:image/jpg;base64,"+data as unknown as string} onError={() => Images.defaulyCompanyLogo} height="45px" width="auto" />
                                                case "status":
                                                    // debugger
                                                    return <HStack spacing="11px">{+data === 1? <><DotIcon color="green" /> <Text>Active</Text></>:<><DotIcon color="red"  /> <Text>Not active</Text></>
                                                         }</HStack>
                                                default:
                                                    return <>{data}</>
                                            }
                                        }
                                        return data
                                    })(data)
                                }
                            </Td>
                        })}
                    {

                        typeof props.actions !== "undefined" && props.actions.length > 1 && <Td>
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
                        typeof props.actions !== "undefined" && props.actions.length === 1 && <Td><Button bgColor="white" _hover={{ bgColor: "white" }} onClick={props.actions[0].method}>{props.actions[0].name}</Button></Td>
                    }
                </Tr>)}
                {
                    typeof props.rows === "undefined" && _.range(0, 8).map(() =>
                        <Tr>
                            {
                                typeof props.columns !== "undefined" && props.columns.map((x, i) => <Td key={i}><SkeletonLoader rows={1} columns={1} width="100%" /></Td>)
                            }
                        </Tr>
                    )
                }
                {
                    typeof props.rows !== "undefined" &&  props.rows.length === 0 &&
                        <Tr>
                            {
                                typeof props.columns !== "undefined" && <Td colSpan={props.columns.length} textAlign="center">No data</Td>
                            }
                        </Tr>
                    
                }
            </Tbody>
            {typeof totalPageNumber !== "undefined" && totalPageNumber > 0 && <Tfoot>
                <Tr>
                    <Td borderBottomRadius="6px" fontSize="13px" pt="25px" pb="25px" colSpan={props.columns.length}>
                        <AppTableFooter />
                    </Td>
                </Tr>
            </Tfoot>}
        </Table>
    )
}