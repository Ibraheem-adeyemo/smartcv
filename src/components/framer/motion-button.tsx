import { Button, ButtonGroup, ButtonGroupProps, ButtonProps } from "@chakra-ui/react";
import { motion } from "framer-motion";

export const MotionButton = motion<ButtonProps>(Button)

export const MotionButtonGroup = motion<ButtonGroupProps>(ButtonGroup)