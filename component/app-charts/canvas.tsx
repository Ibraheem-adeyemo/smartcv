import { Box, BoxProps, forwardRef } from "@chakra-ui/react";

const Canvas = forwardRef<BoxProps, "canvas">((props, ref) => (
    <Box ref={ref} {...props} />
))

export default Canvas
