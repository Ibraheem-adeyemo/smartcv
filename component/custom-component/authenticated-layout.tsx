import { Box, StylesProvider, useMultiStyleConfig, useStyles } from "@chakra-ui/react";
import React from "react";

export function AuthenticatedLayout (props:any) {
    const {variant, size, children} = props
    const styles = useMultiStyleConfig("AuthenticatedLayout", {variant, size})
    return(<Box __css={styles.parent}>
        <StylesProvider value={styles}>{children}</StylesProvider>
    </Box>)
}

export function Header(props:any) {
    const {children, ...rest} = props
    const styles = useStyles()

    return(
        <Box __css={styles.horinzontalMenu} {...rest}>
            <StylesProvider value={styles}>{children}</StylesProvider>
        </Box>
    )
}

export function Userbox(props:any) {
    const {children, ...rest} = props
    const styles = useStyles()
    return(
        <Box __css={styles.userBox} {...rest}>
            <StylesProvider value={styles}>{children}</StylesProvider>
        </Box>
    )
}

export function UserFirstName(props:any) {
    const styles = useStyles()
    return(
        <Box as="p" __css={styles.userFirstName} {...props}/>
    )
}

export function UserAvatar(props:any) {
    const styles = useStyles()
    return(
        <Box __css={styles.userAvatar} {...props}/>
    )
}

export function Sidebar (props:any) {
    const {children, ...rest} = props
    const styles = useStyles()

    return(<Box __css={styles.sidebar} {...rest}>
        <StylesProvider value={styles}>{children}</StylesProvider>
    </Box>)
}

export function SidebarLogoArea (props:any) {
    const {children, ...rest} = props
    const styles = useStyles()

    return(<Box __css={styles.sidebarLogoArea} {...rest}>
        <StylesProvider value={styles}>{children}</StylesProvider>
    </Box>)
}

export function SidebarMenus (props:any) {
    const {children, ...rest} = props
    const styles = useStyles()

    return(<Box __css={styles.sidebarMenus} {...rest}>
        <StylesProvider value={styles}>{children}</StylesProvider>
    </Box>)
}

export function SidebarMenu (props:any) {
    const {children, ...rest} = props
    const styles = useStyles()

    return(<Box __css={styles.sidebarMenu} {...rest}>
        <StylesProvider value={styles}>{children}</StylesProvider>
    </Box>)
}

export function SidebarMenuIcon (props:any) {
    const styles = useStyles()

    return(<Box __css={styles.sidebarMenuIcon} {...props}/>)
}

export function SidebarMenuName (props:any) {
    const {children, ...rest} = props
    const styles = useStyles()

    return(<Box __css={styles.sidebarMenuName}  {...props} />)
}

export function MainPage (props:any) {
    const {children, ...rest} = props
    const styles = useStyles()

    return(
        <Box __css={styles.main} {...rest}>
            <StylesProvider value={styles}>{children}</StylesProvider>
        </Box>
    )
}