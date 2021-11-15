import { HStack, Link, Text } from "@chakra-ui/layout"
import { useContext } from "react"
import { TableContext } from "../provider/table-provider"
import _ from "lodash"

export default function AppTableFooter(_props: any) {

    const { pageNumber,
        totalPageNumber,
        incrementPageNumber,
        decrementPageNumber,
        gotoPage } = useContext(TableContext)

    // console.log({ pageNumber, totalPageNumber })
    return (<>
        {typeof totalPageNumber !== "undefined" &&
            <HStack spacing="8px" justifyContent="right">
                {pageNumber > 1 && <>
                    <Link href={`?page=${1}`} _hover={{textDecoration: "none"}} onClick={(e) => (e.preventDefault(), gotoPage(1))} borderRadius="4px" pt="6px" pb="7px" pl="21.32px" pr="25.68px" border="1px solid rgba(128, 128, 128, 0.25)" >First</Link>
                    <Link href={`page=${pageNumber > 1 ? (pageNumber - 1) : 1}`} _hover={{textDecoration: "none"}} borderRadius="4px" pt="6px" pb="7px" pl="21.32px" pr="25.68px" border="1px solid rgba(128, 128, 128, 0.25)" onClick={(e) => (e.preventDefault(), decrementPageNumber())}>Previous</Link></>
                }
                {_.range(0, totalPageNumber).map((x, i) => <Link  _hover={{textDecoration: "none"}} px="11px" py="5px" border="1px solid rgba(128, 128, 128, 0.25)" borderRadius="4px" display={(x+1) === pageNumber? "initial" :"none"}  href={`?page=${x + 1}`}  onClick={(e) => (e.preventDefault(), gotoPage(x + 1))} key={i}>{x + 1}</Link>)}
                <Text> / </Text><Link  _hover={{textDecoration: "none"}} href={`?page=${totalPageNumber}`} px="11px" py="5px" border="1px solid rgba(128, 128, 128, 0.25)" onClick={(e) => (e.preventDefault(), gotoPage(totalPageNumber))}>{totalPageNumber}</Link>
                {pageNumber < totalPageNumber && <><Link  _hover={{textDecoration: "none"}} href={`page=${pageNumber < totalPageNumber ? pageNumber + 1 : totalPageNumber}`} onClick={(e) => (e.preventDefault(), incrementPageNumber())} borderRadius="4px" pt="6px" pb="7px" pl="18.32px" pr="15.68px" border="1px solid rgba(128, 128, 128, 0.25)" >Next</Link>
                    <Link  _hover={{textDecoration: "none"}} href={`?page=${totalPageNumber}`} onClick={(e) => (e.preventDefault(), gotoPage(totalPageNumber))} borderRadius="4px" pt="6px" pb="7px" pl="18.32px" pr="15.68px" border="1px solid rgba(128, 128, 128, 0.25)" >Last</Link></>
                }
            </HStack>}</>
    )
}