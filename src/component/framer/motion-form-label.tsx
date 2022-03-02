import { FormLabel, Text } from "@chakra-ui/react";
import { MotionText } from ".";
import { ComponentWithChildren } from "../../models";


// const MotionFormLabel = motion<FormLabelProps>(Label)

export const MotionFormLabel = (props: ComponentWithChildren) => {
    return (
        <FormLabel>
            <Text>
                <MotionText variants={{
                    show: {
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 0.4
                        }
                    },
                    hide: {
                        y: "100%",
                        opacity: 0
                    }
                }}
                >{props.children}</MotionText>
            </Text>
        </FormLabel>
    )
}