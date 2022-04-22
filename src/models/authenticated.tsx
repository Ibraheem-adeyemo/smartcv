import { As, ComponentWithAs } from "@chakra-ui/react";

export interface MenuListItem {
    icon: ComponentWithAs<As<any>, object>,
    name: string,
    link: string
}