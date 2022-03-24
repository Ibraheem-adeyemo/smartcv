import { Box, FormLabel, Text } from "@chakra-ui/react";
import { MotionText } from ".";
import { verticalPositionWithOpacity} from "../../animations";
import { ComponentWithChildren } from "../../models";


// const MotionFormLabel = motion<FormLabelProps>(Label)

export const MotionFormLabel = (props: ComponentWithChildren) => {
    return (
        <FormLabel>
            <Box as={"span"} sx={{
                display: "inline-block",
                overflow: "hidden"
            }}>
                <MotionText
                    as={"span"}
                    sx={{
                        display: "inline-block",
                    }}
                    animate={props.children ? "show" : "hide"}
                    initial="hide"
                    variants={verticalPositionWithOpacity()}
                >
                    {props.children}
                </MotionText>
            </Box>
        </FormLabel>
    )
}