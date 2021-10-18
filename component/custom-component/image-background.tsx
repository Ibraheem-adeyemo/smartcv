import { Box, useStyleConfig } from "@chakra-ui/react";
import React from "react";

export function ImageBackground(props:any) {

    const { size, variant, children, ...rest } = props 
    const styles = useStyleConfig("ImageBackground", { size, variant })

    return (
    <Box __css={styles}>{children}</Box>
    )
} 