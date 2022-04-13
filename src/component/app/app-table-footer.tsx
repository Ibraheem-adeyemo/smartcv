import { HStack, Link, Text } from "@chakra-ui/react"
import React, { FC, useContext } from "react"
import { PaginatorContext } from "../../providers"
import { map, range } from "lodash"
import { keysForArrayComponents } from "../../constants"
import { appTableFooterFirstSX, appTableFooterLastSX, appTableFooterNextSX, appTableFooterPaginationSX, appTableFooterPreviousSX } from "../../sx"

const AppTableFooter: FC = () => {

    const { pageNumber,
        totalPageNumber,
        incrementPageNumber,
        decrementPageNumber,
        gotoPage
    } = useContext(PaginatorContext)

    // console.log({ pageNumber, totalPageNumber })
    return (<>
        {typeof totalPageNumber !== "undefined" &&
            <HStack spacing="8px" justifyContent="right">
                {pageNumber > 1 && <>
                    <Link href={`?page=${1}`} onClick={(e) => {
                        e.preventDefault();
                        gotoPage(1)
                    }} sx={appTableFooterFirstSX} >First</Link>
                    <Link href={`page=${pageNumber > 1 ? (pageNumber - 1) : 1}`} sx={appTableFooterPreviousSX} onClick={(e) => {
                        e.preventDefault();
                        decrementPageNumber()
                    }}>Previous</Link></>
                }
                {map(range(0, totalPageNumber), (x, i) => <Link sx={appTableFooterPaginationSX({
                    pageNumber,
                    pageIndex: x
                })}
                    href={`?page=${x + 1}`}
                    onClick={(e) => {
                        e.preventDefault();
                        gotoPage(x + 1)
                    }}
                    key={`${keysForArrayComponents.tableFooter}-${i}`}>{x + 1}</Link>)}
                <Text> / </Text><Link href={`?page=${totalPageNumber}`} onClick={(e) => {
                    e.preventDefault();
                    gotoPage(totalPageNumber)
                }}>{totalPageNumber}</Link>
                {pageNumber < totalPageNumber && <><Link href={`page=${pageNumber < totalPageNumber ? pageNumber + 1 : totalPageNumber}`} onClick={(e) => {
                    e.preventDefault();
                    incrementPageNumber()
                }} sx={appTableFooterNextSX} >Next</Link>
                    <Link href={`?page=${totalPageNumber}`} onClick={(e) => {
                        e.preventDefault();
                        gotoPage(totalPageNumber)
                    }} sx={appTableFooterLastSX} >Last</Link></>
                }
            </HStack>}</> 
    )
}

export default AppTableFooter