import { Box } from "@chakra-ui/layout"
import { AppProps } from "next/app"
import React, { ComponentProps, JSXElementConstructor } from "react"

const Container = ({children, ...props}:{children:React.ReactNode}) => {
    return <Box display="flex" justifyContent="space-evenly" color="white">
        {children}
    </Box>
}


export default Container