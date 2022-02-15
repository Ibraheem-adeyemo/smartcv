import { Box, useStyleConfig } from "@chakra-ui/react";
import React, { FC } from "react";

export const ImageBackground:FC = (props:any) => {

    const { size, variant, children } = props 
    const styles = useStyleConfig("ImageBackground", { size, variant })

    return (
    <Box __css={styles}>{children}</Box>
    )
} 