import { MenuListProps, MenuList, Menu, MenuProps, MenuItemProps, MenuItem } from "@chakra-ui/react";
import { motion } from "framer-motion";

// export const MotionMenu = motion<MenuProps>(Menu)
export const MotionMenuList = motion<MenuListProps>(MenuList)
export const MotionMenuItem = motion<MenuItemProps>(MenuItem)