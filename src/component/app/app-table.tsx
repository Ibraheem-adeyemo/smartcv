import { Icon, Menu, MenuButton, MenuItem, MenuList, Tfoot, Button, HStack, Text } from "@chakra-ui/react";
import { Td, Tr } from "@chakra-ui/table";
import _, { get, map, range, reduce } from "lodash";
import dynamic from "next/dynamic";
import React, { useContext } from "react";
import { IoEllipsisVerticalOutline } from 'react-icons/io5'
import { appear, delayChildren, verticalPosition, verticalPositionWithOpacity, staggerChildrenWithDuration } from "../../animations";
import { appTableElements, DotIcon, Images, keysForArrayComponents } from "../../constants";
import { appDate } from "../../lib";
import { Action, Column } from "../../models";
import { PaginatorContext } from "../../providers";
import { actionButtonSX, columnSX, showNumberColumnSX } from "../../sx";
import { AnimatedText, MotionImage, MotionMenu, MotionMenuItem, MotionMenuList, MotionTable, MotionTbody, MotionTd, MotionThead, MotionTr } from "../framer";
import SkeletonLoader from "../skeleton-loader";


interface ApptableProps<T extends Record<keyof T, T[keyof T]>> {
    columns: Column[],
    rows: T[],
    actions?: Action[],
    showNumbering?: boolean,
    showAllAction?: boolean
}

const AppTableFooter = dynamic(() => import('../app/app-table-footer'), { ssr: false })
interface TdElementProps<T extends Record<keyof T, T[keyof T]>> {
    column: Column,
    data: T[keyof T]

}
const TdElement = <T extends Record<keyof T, T[keyof T]>>(tdElementProps: TdElementProps<T>) => {
    // debugger
    const ifElementExists = (column: Column) => typeof column.ele !== "undefined" && column.ele !== ""
    const isDataExists = (data: T[keyof T]) => typeof data === "undefined" || data === null

    if (ifElementExists(tdElementProps.column)) {
        switch (tdElementProps.column.ele) {
            case appTableElements.image:
                return <MotionImage sx={{
                    height: "45px",
                    width: "auto"
                }}
                    initial="hide"
                    animate="show"
                    variants={appear()}
                    src={isDataExists(tdElementProps.data) ? Images.defaultCompanyLogo : "data:image/jpg;base64," + tdElementProps.data as unknown as string} onError={() => Images.defaultCompanyLogo} />
            case appTableElements.status:
                // debugger
                let data = +tdElementProps.data
                data = !isNaN(data) ? data : 0
                return <HStack spacing="11px">{data === 1 ? <><DotIcon color="green" /> <Text> {typeof tdElementProps.column.lookUp === "undefined" ? 'Active' : tdElementProps.column.lookUp[data]}</Text></> : <><DotIcon color="red" /> <Text>{typeof tdElementProps.column.lookUp === "undefined" ? 'Not Active' : tdElementProps.column.lookUp[data]}</Text></>
                }</HStack>
            case appTableElements.dateTime:
                return <AnimatedText>{appDate(tdElementProps.data)}</AnimatedText>
            case appTableElements.date:
                return <AnimatedText>{appDate(tdElementProps.data, false)}</AnimatedText>
            default:
                return <AnimatedText>{tdElementProps.data}</AnimatedText>
        }
    }
    return tdElementProps.data ? <>{tdElementProps.data}</> : <></>
}

const TdSN = (props: { pageindex: number, pageNumber: number, countPerPage: number }) => {
    let sn = props.pageindex + 1

    if (typeof props.pageNumber !== "undefined") {
        const c = props.countPerPage * props.pageNumber
        sn = sn + (c - props.countPerPage)
    }
    return <Td>{sn}</Td>
}

const AppTable = <T extends Record<keyof T, T[keyof T]>>({ showNumbering = false, showAllAction = false, ...props }: ApptableProps<T>) => {

    const { totalPageNumber, pageNumber, countPerPage } = useContext(PaginatorContext)
    // console.log({rows: props.rows})
    const isActionAvailable = typeof props.actions !== "undefined" && props.actions.length > 0
    const ifPrefixExists = (column: Column) => typeof column.prefix !== "undefined" && column.prefix !== ""
    const ifSuffixExists = (column: Column) => typeof column.suffix !== "undefined" && column.suffix !== ""
    const isActionUnavailable = typeof props.actions === "undefined" || props.actions.length === 0
    const isShowTextOnly = (action: Action) => action && action.showTextOnly
    const isDataUnavailable = typeof props.rows !== "undefined" && props.rows.length === 0
    const isPaginated = typeof totalPageNumber !== "undefined" && totalPageNumber > 1
    return (
        <MotionTable
            animate="show"
            initial="hide"
            variants={delayChildren} >
            <MotionThead sx={{
                overflow: "hidden",
            }}
                animate="show"
                initial="hide"
                variants={delayChildren}
            >
                <MotionTr
                    sx={{
                        bgColor: "#F8F9FF",
                        fontWeight: "600"
                    }}
                    animate="show"
                    initial="show"
                    variants={verticalPosition}
                >
                    {showNumbering && <MotionTd sx={showNumberColumnSX}>#</MotionTd>}
                    {map(props.columns, (x, i, arr) => <MotionTd
                        key={`${keysForArrayComponents.tableColumn}-${i}`}
                        sx={columnSX({ columnArray: arr, columnIndex: i, showNumbering, isActionUnavailable })}  >{x.name}</MotionTd>)}
                    {isActionAvailable &&
                        <MotionTd
                            sx={{
                                borderTopRightRadius: "6px"
                            }}
                        ></MotionTd>}
                </MotionTr>
            </MotionThead>
            <MotionTbody

                animate="show"
                initial="hide"
                variants={appear()}
            >
                {
                    typeof props.rows?.map !== "undefined" && props.rows?.map((x: T, i: number) =>
                        <MotionTr key={`${keysForArrayComponents.motionTBodyRow}-${i}`}
                            initial="hide"
                            animate="show"
                            variants={appear()}
                        >
                            {
                                showNumbering && <TdSN pageindex={i} pageNumber={pageNumber} countPerPage={countPerPage} />
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
                                    if (ifPrefixExists(y)) {
                                        data = `${y.prefix}${data}` as T[keyof T]
                                    }
                                    if (ifSuffixExists(y)) {
                                        data = `${data}${y.suffix}` as T[keyof T]
                                    }
                                    return <Td fontSize="13px" py="19px" key={`${keysForArrayComponents.motionTBodyCell}-${j}`}>
                                        <TdElement<T> column={y} data={data} />
                                    </Td>
                                }))
                            }
                            {
                                typeof props.actions !== "undefined" && !showAllAction && <Td>
                                    <MotionMenu initial="hide" animate="show" variants={appear()} direction="ltr">
                                        {({ isOpen }) => {
                                            // debugger
                                            return (
                                                <>
                                                    <MenuButton as={Button} bgColor="white">
                                                        <Icon as={IoEllipsisVerticalOutline} />
                                                    </MenuButton>
                                                    <MotionMenuList initial="hide" animate="show" variants={staggerChildrenWithDuration}>

                                                        {
                                                            map(props.actions, (z, k) => <MenuItem key={`${keysForArrayComponents.actionMenuItem}-${k}`}
                                                                sx={{
                                                                    bgColor: typeof z.bgColor === "undefined" ? "white" : z.bgColor,
                                                                    color: typeof z.color === "undefined" ? "initial" : z.color
                                                                }}
                                                                onClick={() => isShowTextOnly(z) ? undefined : z.method<T>(x)}>
                                                                {z.name}
                                                            </MenuItem>)
                                                        }
                                                    </MotionMenuList>
                                                </>
                                            )
                                        }}
                                    </MotionMenu>
                                </Td>
                            }
                            {
                                typeof props.actions !== "undefined" && showAllAction && <Td>{props.actions.map((z, k) =>
                                    <Button
                                        onClick={() => typeof z.showTextOnly !== "undefined" && z.showTextOnly ? undefined : z.method<T>(x)}
                                        sx={actionButtonSX(z)}
                                        key={`${keysForArrayComponents.actionButton}-${k}`} >{z.name}</Button>)}</Td>
                            }
                        </MotionTr>)
                }
                {
                    typeof props.rows === "undefined" && map(range(8), (z, i) =>
                        <MotionTr key={`${keysForArrayComponents.motionTrSkeleton}-${i}`}>
                            {
                                typeof props.columns !== "undefined" && map(props.columns, (x, j) => <Td key={`${keysForArrayComponents.motionTrColumnSkeleton}-${j}`}>
                                    <SkeletonLoader rows={1} loaderKey={`${keysForArrayComponents.motionTrColumnSkeleton}-${j}`} columns={1} width="60px" height="10px" />
                                </Td>)

                            }
                            {
                                isActionAvailable && map(props.actions, (x, j) => <Td key={`${keysForArrayComponents.motionTrActionSkeleton}${j}`}>
                                    <SkeletonLoader rows={1} loaderKey={`${keysForArrayComponents.motionTrActionSkeleton}-${j}`} columns={1} width="60px" height="10px" />
                                </Td>)
                            }
                        </MotionTr>
                    )
                }
                {
                    isDataUnavailable &&
                    <MotionTr>
                        {
                            typeof props.columns !== "undefined" && <Td colSpan={props.columns.length} textAlign="center">No data</Td>
                        }
                    </MotionTr>

                }
            </MotionTbody>
            {isPaginated &&
                <Tfoot>
                    <Tr>
                        <Td borderBottomRadius="6px" fontSize="13px" pt="25px" pb="25px" colSpan={props.columns.length}>
                            <AppTableFooter />
                        </Td>
                    </Tr>
                </Tfoot>
            }
        </MotionTable>
    )
}

export default AppTable