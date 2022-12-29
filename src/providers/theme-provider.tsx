import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import { FC, useContext } from "react";
import { ComponentWithChildren } from "../models";
import { overrides } from "../theme";
import colors from "../theme/foundations/colors";
import { AuthContext } from "./auth-provider";


const ThemeProvider: FC<ComponentWithChildren> = (props: ComponentWithChildren) => {
    const { userDetail } = useContext(AuthContext)
    const tenantHasColor = userDetail && userDetail.tenant && userDetail.tenant.color
    const bgsidebarColour = tenantHasColor ? userDetail.tenant.color.sidebarColour : colors.brand["bg-sidebar-color"];
    const bgMenuColor = tenantHasColor ? userDetail.tenant.color.headerColor : colors.brand["bg-horizontal-nav-color"];
    const bgButtonColor = tenantHasColor ? userDetail.tenant.color.buttonColor : colors.brand["bg-button-color"];

    overrides.colors.brand = {
        ...overrides.colors.brand,
        "bg-sidebar-color": bgsidebarColour,
        "bg-horizontal-nav-color": bgMenuColor,
        "bg-button-color": bgButtonColor
    }
    const theme = extendTheme(overrides)
    return (
        <ChakraProvider theme={theme}>
            {props.children}
        </ChakraProvider>

    )
}

export default ThemeProvider