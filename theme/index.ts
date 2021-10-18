import { extendTheme } from "@chakra-ui/react";
import AuthenticatedLayout from "./components/authenticated-layout";
import ImageBackground from "./components/image-background";
import ISWLogo from "./components/isw-logo";
import LoginForm from "./components/login-form";
import MissionStatement from "./components/mission-statement";

import colors from "./foundations/colors";
import styles from "./style";

const overrides = {
    styles,
    colors,
    components: {
        MissionStatement,
        LoginForm,
        ImageBackground,
        AuthenticatedLayout,
        ISWLogo
    }
}

export default extendTheme(overrides)
