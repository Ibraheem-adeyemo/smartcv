import { Box, useStyleConfig } from "@chakra-ui/react"
import React, { FC } from "react"

export const InterswitchLogo:FC<any> = (props:any) => {
    const {children, variant, ...rest} = props
    const style = useStyleConfig("ISWLogo", {variant})
    return (
        <Box __css={style}>{children}</Box>
    )
}