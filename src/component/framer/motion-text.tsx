import { Box, Text, TextProps } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FC } from "react";
import { MotionBox, MotionSpan } from ".";
import { verticalPositionWithOpacity } from "../../animations";
import { ComponentWithChildren } from "../../models";

export const MotionText = motion<TextProps>(Text)

export const AnimatedText: FC<ComponentWithChildren & TextProps> = (props: ComponentWithChildren & TextProps) => {
    const { children, ...rest } = props
    return (<Box as={"span"} sx={{
        display: "inline-block",
        overflow: "hidden"
    }}>
                <MotionBox
                    as={"span"}
                    sx={{
                        display: "inline-block"
                    }}
                    animate={children?"show":"hide"}
                    initial="hide"
                    exit="hide"
                    variants={verticalPositionWithOpacity}
                >
                    <Text {...rest}>
                        {children}
                    </Text>
                </MotionBox>
    </Box>)
}
export const AnimatedCardHeader: FC<ComponentWithChildren & TextProps> = (props: ComponentWithChildren & TextProps) => {
    const { children, ...rest } = props
    return (<Box as={"span"} sx={{
        display: "inline-block",
        overflow: "hidden"
    }}>
                <MotionBox
                    as={"span"}
                    sx={{
                        display: "inline-block"
                    }}
                    animate={children?"show":"hide"}
                    initial="hide"
                    exit="hide"
                    variants={verticalPositionWithOpacity}
                >
                    <Text  variant="card-header" size="card-header" {...rest}>
                        {children}
                    </Text>
                </MotionBox>
    </Box>)
}