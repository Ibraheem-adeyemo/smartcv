import { Box } from "@chakra-ui/layout";
import React, { createContext, useState } from "react";
import { usePagination } from "../hooks";
import { ComponentWithChildren } from "../models";

export const TableContext = createContext<ReturnType<typeof usePagination>>({
    pageNumber: 1,
    countPerPage: 8,
    totalPageNumber: 100,
    changeCountPerPage: () => (""),
    incrementPageNumber: () => (""),
    decrementPageNumber: () => (""),
    gotoPage: () => (""),
    setPaginationProps: () => ("")
})

interface TableProviderProps extends ComponentWithChildren {
    
}
export default function TableProvider(props: TableProviderProps) {
    const { pageNumber,
        countPerPage,
        totalPageNumber,
        changeCountPerPage,
        incrementPageNumber,
        decrementPageNumber,
        gotoPage, setPaginationProps } = usePagination(8)
    return <TableContext.Provider value={{
        pageNumber,
        countPerPage,
        totalPageNumber,
        changeCountPerPage,
        incrementPageNumber,
        decrementPageNumber,
        gotoPage,
        setPaginationProps
    }}>
        <Box w="100%" bgColor="white" borderRadius="6px" boxShadow="0px 4px 15px rgba(0, 0, 0, 0.05)">
        {props.children}
        </Box>
    </TableContext.Provider>
}