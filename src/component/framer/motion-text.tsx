import { Box, Text, TextProps } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FC } from "react";
import { MotionBox, MotionSpan } from ".";
import { ComponentWithChildren } from "../../models";

export const MotionText = motion<TextProps>(Text)

export const AnimatedText: FC<ComponentWithChildren & TextProps> = (props: ComponentWithChildren & TextProps) => {
    const {children, ...rest} = props
    return (<Box as={"span"} sx={{
        display: "inline-block",
        overflow: "hidden"
    }}>
        <MotionBox
            as={"span"}
            sx={{
                display: "inline-block"
            }}
            animate="show"
            initial="hide"
            variants={{
                show: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.4
                    }
                },
                hide: {
                    opacity: 0,
                    y: "200%"
                }
            }}
        >
            <Text {...rest}>
            {children}
            </Text>
        </MotionBox>
    </Box>)
}