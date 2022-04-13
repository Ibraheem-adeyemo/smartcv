import { CSSObject } from "@chakra-ui/react"
import { Action, Column } from "../models"

export const showNumberColumnSX: CSSObject = {
    fontSize: "13px",
    py: "19px",
    borderTopLeftRadius: "6px"
}

interface columnSXProps {
    columnIndex: number,
    columnArray: Column[],
    showNumbering: boolean,
    isActionUnavailable: boolean
}

type columnSXFunc = (props: columnSXProps) => CSSObject
export const columnSX: columnSXFunc = (props: columnSXProps) => ({
    fontSize: "13px",
    py: "19px",
    borderTopLeftRadius: props.columnIndex === 0 && !props.showNumbering ? "6px" : "unset",
    borderTopRightRadius: (props.columnIndex + 1) === props.columnArray.length && props.isActionUnavailable ? "6px" : "unset"
})

type actionButtonSXFunc = (action: Action) => CSSObject

export const actionButtonSX: actionButtonSXFunc = (action: Action) => ({
    bgColor: typeof action.bgColor === "undefined" ? "white" : action.bgColor,
    color: typeof action.color === "undefined" ? "initial" : action.color,
    _hover: {
        bgColor: "white"
    }
})