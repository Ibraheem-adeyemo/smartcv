import { forwardRef, Link,  } from "@chakra-ui/react"
import NextLink from "next/link"
import React from "react"

const AppLink = forwardRef((props, ref) => {
    const { children, ...rest } = props
    return (
        <Link textAlign="center" as={NextLink} {...rest} ref={ref}>
            <Link textAlign="center" as={"a"} {...rest}>{children}</Link>
        </Link>)
})
export default AppLink