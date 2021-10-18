import { Box, useStyleConfig, useStyles } from "@chakra-ui/react"
import React from "react"
import styles from "../../theme/style"

export function InterswitchLogo (props:any) {
    const {children, variant, ...rest} = props
    const style = useStyleConfig("ISWLogo", {variant})
    return (
        <Box __css={style}>{children}</Box>
    )
}