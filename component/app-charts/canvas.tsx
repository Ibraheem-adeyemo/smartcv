import { Box, BoxProps, ChakraComponent, forwardRef, } from "@chakra-ui/react";
type CanvasComponent = ChakraComponent<'canvas', {}>

const Canvas = ((props: BoxProps) => (
  <Box {...props} />
)) as CanvasComponent

export default Canvas
