import { Icon, Menu, MenuButton, MenuItem, MenuList, Tfoot, Button, HStack, Text } from "@chakra-ui/react";
import { Td, Tr } from "@chakra-ui/table";
import _, { get, map, range, reduce } from "lodash";
import dynamic from "next/dynamic";
import React, { useContext } from "react";
import { IoEllipsisVerticalOutline } from 'react-icons/io5'
import { appTableElements, DotIcon, Images } from "../../constants";
import { appDate } from "../../lib";
import { Action, Column } from "../../models";
import { PaginatorContext } from "../../providers/paginator-provider";
import { AnimatedText, MotionImage, MotionTable, MotionTbody, MotionTd, MotionThead, MotionTr } from "../framer";
import SkeletonLoader from "../skeleton-loader";


interface ApptableProps<T extends Record<keyof T, T[keyof T]>> {
    columns: Column[],
    rows: T[],
    actions?: Action[],
    showNumbering?: boolean,
    showAllAction?: boolean
}

const AppTableFooter = dynamic(() => import('../app/app-table-footer'), { ssr: false })

const AppTable = <T extends Record<keyof T, T[keyof T]>>({ showNumbering = false, showAllAction = false, ...props }: ApptableProps<T>) => {

    const { totalPageNumber, pageNumber, countPerPage } = useContext(PaginatorContext)
    // console.log({rows: props.rows})

    return (
        <MotionTable
            animate="show"
            initial="hide"
            variants={{

                show: {
                    opacity: 1,
                    transition: {
                        delayChildren: 0.4
                    }
                },
                hide: {
                    opacity: 0,
                }
            }} >
            <MotionThead sx={{
                overflow: "hidden",
            }}
                animate="show"
                initial="hide"
                variants={{

                    show: {
                        transition: {
                            delayChildren: 0.3
                        }
                    },
                    hide: {
                    }
                }}
            >
                <MotionTr
                    sx={{
                        bgColor: "#F8F9FF",
                        fontWeight: "600"
                    }}
                    animate="show"
                    initial="show"
                    variants={{
                        show: {
                            opacity: 1,
                            y: 0,
                        },
                        hide: {
                            opacity: 0,
                            y: "200%"
                        }
                    }}
                >
                    {showNumbering && <MotionTd sx={{
                        fontSize: "13px", py: "19px", borderTopLeftRadius: "6px"
                    }}
                    >#</MotionTd>}
                    {map(props.columns, (x, i, arr) => <MotionTd
                        key={i}
                        sx={{
                            fontSize: "13px",
                            py: "19px",
                            borderTopLeftRadius: i === 0 && !showNumbering ? "6px" : "unset",
                            borderTopRightRadius: (i + 1) === arr.length && (typeof props.actions === "undefined" || props.actions.length === 0) ? "6px" : "unset"
                        }}  >{x.name}</MotionTd>)}
                    {(typeof props.actions !== "undefined" && props.actions.length > 0) &&
                        <MotionTd key={props.actions.length}
                            sx={{
                                borderTopRightRadius: "6px"
                            }}
                        ></MotionTd>}
                </MotionTr>
            </MotionThead>
            <MotionTbody

                animate="show"
                initial="hide"
                variants={{

                    show: {
                        opacity: 1,
                        transition: {
                            delayChildren: 0.4
                        }
                    },
                    hide: {
                        opacity: 0
                    }
                }}
            >
                {
                    typeof props.rows?.map !== "undefined" && props.rows?.map((x: T, i: number) =>
                        <MotionTr key={i}
                            initial="hide"
                            animate="show"
                            variants={{
                                hide:{
                                    y: 100,
                                    opacity: 0
                                },
                                show: {
                                    y:0, transition: {
                                        duration: 0.2
                                    },
                                    opacity: 1
                                }
                            }}
                        >
                            {
                                showNumbering && (() => {
                                    let sn = i + 1

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

                                    if (columns.length > 1) {


                                        data = reduce(columns, (acc: unknown, curr) => acc === "" ? get(x, curr) : acc + " " + get(x, curr), "") as T[keyof T]
                                        if (typeof y.lookUp !== "undefined") {
                                            if (typeof y.ele === "undefined") {
                                                data = y.lookUp[data]
                                            }
                                        }
                                    }
                                    if (typeof y.prefix !== "undefined" && y.prefix !== "") {
                                        data = `${y.prefix}${data}` as T[keyof T]
                                    }
                                    if (typeof y.suffix !== "undefined" && y.suffix !== "") {
                                        data = `${data}${y.suffix}` as T[keyof T]
                                    }
                                    return <Td fontSize="13px" py="19px" key={j}>
                                        {
                                            (() => {
                                                if (typeof y.ele !== "undefined" && y.ele !== "") {
                                                    switch (y.ele) {
                                                        case appTableElements.image:
                                                            return <MotionImage sx={{
                                                                height: "45px",
                                                                width: "auto"
                                                            }}
                                                                initial="hide"
                                                                animate="show"
                                                                variants={{
                                                                    show: {
                                                                        opacity: 1
                                                                    },
                                                                    hide: {
                                                                        opacity: 0
                                                                    }
                                                                }}
                                                                src={typeof data === "undefined" || data === null ? Images.defaultCompanyLogo : "data:image/jpg;base64," + data as unknown as string} onError={() => Images.defaultCompanyLogo} />
                                                        case appTableElements.status:

                                                            return <HStack spacing="11px">{+data === 1 ? <><DotIcon color="green" /> <Text> {typeof y.lookUp === "undefined" ? 'Active' : y.lookUp[+data]}</Text></> : <><DotIcon color="red" /> <Text>{typeof y.lookUp === "undefined" ? 'Not Active' : y.lookUp[+data]}</Text></>
                                                            }</HStack>
                                                        case appTableElements.dateTime:
                                                            return <AnimatedText>{appDate(data)}</AnimatedText>
                                                        case appTableElements.date:
                                                            return <AnimatedText>{appDate(data, false)}</AnimatedText>
                                                        default:
                                                            return <AnimatedText>{data}</AnimatedText>
                                                    }
                                                }
                                                return data
                                            })()
                                        }
                                    </Td>
                                }))
                            }
                            {
                                typeof props.actions !== "undefined" && !showAllAction && <Td>
                                    <Menu>
                                        <MenuButton as={Button} bgColor="white">
                                            <Icon as={IoEllipsisVerticalOutline} />
                                        </MenuButton>
                                        <MenuList>

                                            {
                                                map(props.actions, (z, k) => <MenuItem key={k} bgColor={typeof z.bgColor === "undefined" ? "white" : z.bgColor} color={typeof z.color === "undefined" ? "initial" : z.color} onClick={() => typeof z.showTextOnly !== "undefined" && z.showTextOnly ? undefined : z.method<T>(x)}>
                                                    {z.name}
                                                </MenuItem>)
                                            }
                                        </MenuList>
                                    </Menu>
                                </Td>
                            }
                            {
                                typeof props.actions !== "undefined" && showAllAction && <Td>{props.actions.map((z, k) => <Button bgColor={typeof z.bgColor === "undefined" ? "white" : z.bgColor} color={typeof z.color === "undefined" ? "initial" : z.color} _hover={{ bgColor: "white" }} onClick={() => typeof z.showTextOnly !== "undefined" && z.showTextOnly ? undefined : z.method<T>(x)} key={k} >{z.name}</Button>)}</Td>
                            }
                        </MotionTr>)
                }
                {
                    typeof props.rows === "undefined" && map(range(8), () =>
                        <MotionTr>
                            {
                                typeof props.columns !== "undefined" && map(props.columns, (x, i) => <Td key={i}><SkeletonLoader rows={1} columns={1} width="60px" height="10px" /></Td>)
                            }
                        </MotionTr>
                    )
                }
                {
                    typeof props.rows !== "undefined" && props.rows.length === 0 &&
                    <MotionTr>
                        {
                            typeof props.columns !== "undefined" && <Td colSpan={props.columns.length} textAlign="center">No data</Td>
                        }
                    </MotionTr>

                }
            </MotionTbody>
            {typeof totalPageNumber !== "undefined" && totalPageNumber > 1 && <Tfoot>
                <Tr>
                    <Td borderBottomRadius="6px" fontSize="13px" pt="25px" pb="25px" colSpan={props.columns.length}>
                        <AppTableFooter />
                    </Td>
                </Tr>
            </Tfoot>}
        </MotionTable>
    )
}

export default AppTable