import { CSSObject } from "@chakra-ui/react";

export const appTableFooterFirstSX: CSSObject = {
    borderRadius: "4px",
    pt: "6px",
    pb: "7px",
    pl: "21.32px",
    pr: "25.68px",
    border: "1px solid rgba(128, 128, 128, 0.25)",
    _hover: {
        textDecoration: "none"
    }
}

export const appTableFooterPreviousSX: CSSObject = {
    borderRadius: "4px",
    pt: "6px",
    pb: "7px",
    pl: "21.32px",
    pr: "25.68px",
    border: "1px solid rgba(128, 128, 128, 0.25)",
    _hover: {
        textDecoration: "none"
    }
}

interface appTableFooterPaginatorSXProps {
    pageNumber: number,
    pageIndex: number
}
type appTableFooterPaginatorSXFunc = (props: appTableFooterPaginatorSXProps) => CSSObject
export const appTableFooterPaginationSX: appTableFooterPaginatorSXFunc = (props) => ({
    px: "11px",
    py: "5px",
    border: "1px solid rgba(128, 128, 128, 0.25)",
    borderRadius: "4px",
    display: (props.pageIndex + 1) === props.pageNumber ? "initial" : "none",
    _hover: {
        textDecoration: "none"
    }
})

export const appTableFooterNextSX: CSSObject = {
    borderRadius: "4px",
    pt: "6px",
    pb: "7px",
    pl: "18.32px",
    pr: "15.68px",
    border: "1px solid rgba(128, 128, 128, 0.25)"
}

export const appTableFooterLastSX: CSSObject = {
    borderRadius: "4px",
    pt: "6px",
    pb: "7px",
    pl: "18.32px",
    pr: "15.68px",
    border: "1px solid rgba(128, 128, 128, 0.25)",
    _hover: {
        textDecoration: "none"
    }
}

