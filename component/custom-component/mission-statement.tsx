
import {
    Box,
    Flex,
    StylesProvider,
    useMultiStyleConfig,
    useStyles,
} from "@chakra-ui/react"
import React from "react"

export function MissionStatement(props: any) {
    const { size, variant, children, ...rest } = props
    // 2. Consume the `useMultiStyleConfig` hook
    const styles = useMultiStyleConfig("MissionStatement", { size, variant })
    return (
        <Flex __css={styles.missionStatement} {...rest}>
            {/* 3. Mount the computed styles on `StylesProvider` */}
            <StylesProvider value={styles}>{children}</StylesProvider>
        </Flex>
    )
}

export function TextContainer(props: any) {
    const { children, ...rest } = props
    const styles = useStyles()

    return <Box __css={styles.textContainer} {...rest}>
        <StylesProvider value={styles}>{children}</StylesProvider>
    </Box>
}

export function LogoContainer(props: any) {
    // 4. Read computed `item` styles from styles provider
    const { children, ...rest } = props
    const styles = useStyles()
    return <Box __css={styles.logoContainer} {...rest}>
        {/* 3. Mount the computed styles on `StylesProvider` */}
        <StylesProvider value={styles}>{children}</StylesProvider>
    </Box>
}
export function TopBanner(props: any) {
    // 4. Read computed `item` styles from styles provider
    const styles = useStyles()
    return <Box as="p" __css={styles.topBanner} {...props} />
}

export function BulletContainer(props: any) {
    const { children, ...rest } = props
    // 4. Read computed `item` styles from styles provider
    const styles = useStyles()
    return <Box __css={styles.bulletContainer} {...rest}>
        {/* 3. Mount the computed styles on `StylesProvider` */}
        <StylesProvider value={styles}>{children}</StylesProvider>

    </Box>
}

export function MessageContainer(props: any) {
    const { children, ...rest } = props
    // 4. Read computed `item` styles from styles provider
    const styles = useStyles()
    return <Box __css={styles.messageContainer} {...rest}>
        {/* 3. Mount the computed styles on `StylesProvider` */}
        <StylesProvider value={styles}>{children}</StylesProvider>

    </Box>
}

export function BulletHeader(props: any) {
    // 4. Read computed `item` styles from styles provider
    const styles = useStyles()
    return <Box as="p" __css={styles.bulletHeader} {...props} />
}

export function BulletMessage(props: any) {
    // 4. Read computed `item` styles from styles provider
    const styles = useStyles()
    return <Box __css={styles.bulletMessage} {...props} />
}