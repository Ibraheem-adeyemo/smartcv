import { Flex, FlexProps, Image, ImageProps, List, ListItem, ListItemProps, ListProps } from "@chakra-ui/react";
import { motion } from "framer-motion";


export const MotionList = motion<ListProps>(List)
export const MotionListItem = motion<ListItemProps>(ListItem)