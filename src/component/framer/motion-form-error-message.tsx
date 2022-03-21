import { Box, FormErrorMessage } from "@chakra-ui/react";
import { verticalPositionWithOpacity } from "../../animations";
import { ComponentWithChildren } from "../../models";
import { MotionBox } from "./motion-box";


// const MotionFormLabel = motion<FormLabelProps>(Label)

export const MotionFormErrorMessage = (props: ComponentWithChildren) => {
    // debugger
    return (
        <FormErrorMessage>
            <Box as="span" sx={{
                display: "inline-block",
                overflow: "hidden"
            }}>
                <MotionBox
                    as="span"
                    animate={"show"}
                    initial="hide"
                    exit="hide"
                    sx={{
                        display: "inline-block",
                    }}
                    variants={verticalPositionWithOpacity}
                >
                    <FormErrorMessage>{props.children}</FormErrorMessage>
                </MotionBox>
            </Box>
        </FormErrorMessage>
    )
}