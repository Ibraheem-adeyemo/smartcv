import { Box } from "@chakra-ui/layout"
import React, {  } from "react"

const Container = ({children}:{children:React.ReactNode}) => {
    return <Box display="flex" justifyContent="space-evenly" color="white">
        {children}
    </Box>
}


export default Container