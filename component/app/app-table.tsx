import { Icon, Menu, MenuButton, MenuItem, MenuList, Tfoot, Thead, Button, Image, HStack, Text } from "@chakra-ui/react";
import { Table, Tbody, Td, Tr } from "@chakra-ui/table";
import _, { get, map, range, reduce } from "lodash";
import dynamic from "next/dynamic";
import React, { useContext } from "react";
import { IoEllipsisVerticalOutline } from 'react-icons/io5'
import { DotIcon, Images } from "../../constants";
import { appDate } from "../../lib";
import { Action, Column } from "../../models";
import { PaginatorContext } from "../../provider/paginator-provider";
import SkeletonLoader from "../skeleton-loader";


interface ApptableProps<T extends Record<keyof T, T[keyof T]>> {
    columns: Column[],
    rows: T[],
    actions?: Action[],
    showNumbering?: boolean
}

const AppTableFooter = dynamic(() => import('../app/app-table-footer'))

const AppTable = <T extends Record<keyof T, T[keyof T]>>({ showNumbering = false, ...props }: ApptableProps<T>) => {

    const { totalPageNumber, pageNumber, countPerPage } = useContext(PaginatorContext)
    // console.log({rows: props.rows})

    return (
        <Table>
            <Thead>
                <Tr bgColor="#F8F9FF" fontWeight="600" >
                    {showNumbering && <Td fontSize="13px" py="19px" borderTopLeftRadius="6px" >#</Td>}
                    {map(props.columns, (x, i, arr) => <Td fontSize="13px" py="19px" key={i} borderTopLeftRadius={i === 0 && !showNumbering ? "6px" : "unset"} borderTopRightRadius={(i + 1) === arr.length && (typeof props.actions === "undefined" || props.actions.length === 0) ? "6px" : "unset"} >{x.name}</Td>)}
                    {(typeof props.actions !== "undefined" && props.actions.length > 0) && <Td key={props.actions.length} borderTopRightRadius="6px"></Td>}
                </Tr>
            </Thead>
            <Tbody>
                {
                    props.rows?.map((x: T, i: number) =>
                        <Tr key={i}>
                            {
                                showNumbering && (() => {
                                    let sn = i + 1
                                    // debugger
                                    if (typeof pageNumber !== "undefined") {
                                        const c = countPerPage * pageNumber
                                        sn = sn + (c - countPerPage)
                                    }
                                    return <Td>{sn}</Td>
                                })()
                            }
                            {
                                map(props.columns, ((y, j) => {
                                    const columns = (y.key).split(",") as (keyof T)[];
                                    let data = get(x, columns[0])
                                    // debugger
                                    if (columns.length > 1) {

                                        // debugger
                                        data = reduce(columns, (acc: unknown, curr) => acc === "" ? get(x, curr) : acc + " " + get(x, curr), "") as T[keyof T]
                                    }
                                    if(typeof y.prefix !== "undefined" && y.prefix !== "") {
                                        data = `${y.prefix}${data}` as T[keyof T]
                                    }
                                    if(typeof y.suffix !== "undefined" && y.suffix !== "") {
                                        data = `${data}${y.suffix}` as T[keyof T]
                                    }
                                    return <Td fontSize="13px" py="19px" key={j}>
                                        {
                                            (() => {
                                                if (typeof y.ele !== "undefined" && y.ele !== "") {
                                                    switch (y.ele) {
                                                        case "image":
                                                            return <Image src={typeof data === "undefined" || data === null ? Images.defaultCompanyLogo : "data:image/jpg;base64," + data as unknown as string} onError={() => Images.defaultCompanyLogo} height="45px" width="auto" />
                                                        case "status":
                                                            // debugger
                                                            return <HStack spacing="11px">{+data === 1 ? <><DotIcon color="green" /> <Text>Active</Text></> : <><DotIcon color="red" /> <Text>Not active</Text></>
                                                            }</HStack>
                                                        case "datetime":
                                                            return <>{appDate(data)}</>
                                                        case "date":
                                                            return <>{appDate(data, false)}</>
                                                        default:
                                                            return <>{data}</>
                                                    }
                                                }
                                                return data
                                            })()
                                        }
                                    </Td>
                                }))
                            }
                            {
                                typeof props.actions !== "undefined" && props.actions.length > 1 && <Td>
                                    <Menu>
                                        <MenuButton as={Button} bgColor="white">
                                            <Icon as={IoEllipsisVerticalOutline} />
                                        </MenuButton>
                                        <MenuList>

                                            {
                                                map(props.actions, (z, k) => <MenuItem key={k} onClick={() => z.method<T>(x)}>{z.name}</MenuItem>)
                                            }
                                        </MenuList>
                                    </Menu>
                                </Td>
                            }
                            {
                                typeof props.actions !== "undefined" && props.actions.length === 1 && <Td>{props.actions.map((z, k) => <Button bgColor="white" _hover={{ bgColor: "white" }} onClick={() => z.method<T>(x)}>{z.name}</Button>)}</Td>
                            }
                        </Tr>)
                }
                {
                    typeof props.rows === "undefined" && map(range(8), () =>
                        <Tr>
                            {
                                typeof props.columns !== "undefined" && map(props.columns, (x, i) => <Td key={i}><SkeletonLoader rows={1} columns={1} width="60px" height="10px" /></Td>)
                            }
                        </Tr>
                    )
                }
                {
                    typeof props.rows !== "undefined" && props.rows.length === 0 &&
                    <Tr>
                        {
                            typeof props.columns !== "undefined" && <Td colSpan={props.columns.length} textAlign="center">No data</Td>
                        }
                    </Tr>

                }
            </Tbody>
            {typeof totalPageNumber !== "undefined" && totalPageNumber > 1 && <Tfoot>
                <Tr>
                    <Td borderBottomRadius="6px" fontSize="13px" pt="25px" pb="25px" colSpan={props.columns.length}>
                        <AppTableFooter />
                    </Td>
                </Tr>
            </Tfoot>}
        </Table>
    )
}

export default AppTable