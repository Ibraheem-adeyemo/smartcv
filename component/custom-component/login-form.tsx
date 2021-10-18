import { Box, Flex, StylesProvider, useMultiStyleConfig, useStyles } from "@chakra-ui/react"
import React from "react"

export function FormContainer(props: any) {
    const { size, variant, children, ...rest } = props
    // 2. Consume the `useMultiStyleConfig` hook
    const styles = useMultiStyleConfig("LoginForm", { size, variant })
    return (
        <Flex as="form" __css={styles.formcontainer} {...rest}>
            {/* 3. Mount the computed styles on `StylesProvider` */}
            <StylesProvider value={styles}>{children}</StylesProvider>
        </Flex>
    )
}

export function Welcome(props: any) {
    const styles = useStyles()

    return <Box as="p" __css={styles.welcome} {...props} />
}

export function ActionButton(props:any) {
    const styles = useStyles()

    return <Box as="button" __css={styles.button} {...props} />
}

export function FormError(props:any) {
    const styles = useStyles()

    return <Box as="p" __css={styles.error} {...props} />
}

export function NotRegistered(props:any) {
    const { children, ...rest } = props
    const styles = useStyles()

    return <Box as="p" __css={styles.notRegistered} {...rest}>
        <StylesProvider value={styles}>{children}</StylesProvider>
    </Box>
}
