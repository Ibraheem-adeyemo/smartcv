import { FormErrorMessage, FormLabel, Text } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { MotionText } from ".";
import { verticalPositionWithOpacity } from "../../animations";
import { ComponentWithChildren } from "../../models";


// const MotionFormLabel = motion<FormLabelProps>(Label)

export const MotionFormErrorMessage = (props: ComponentWithChildren) => {
    // debugger
    return (
        <FormErrorMessage>
            <Text sx={{
                display: "inline-block",
                overflow: "hidden"
            }}>
                        <MotionText
                            animate={"show"}
                            initial="hide"
                            exit="hide"
                            sx={{
                                display: "inline-block",
                            }}
                            variants={verticalPositionWithOpacity}
                        ><FormErrorMessage>{props.children}</FormErrorMessage></MotionText>
            </Text>
        </FormErrorMessage>
    )
}