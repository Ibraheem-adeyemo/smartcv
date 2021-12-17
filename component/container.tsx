import { Box } from "@chakra-ui/layout"
import React, {  } from "react"
import { ComponentWithChildren } from "../models"

const Container = (props: ComponentWithChildren) => {
    return <Box display="flex" justifyContent="space-evenly" color="white">
        {props.children}
    </Box>
}


export default Container