import { extendTheme } from "@chakra-ui/react";
import AuthenticatedLayout from "./components/authenticated-layout";
import ImageBackground from "./components/image-background";
import ISWLogo from "./components/isw-logo";
import LoginForm from "./components/login-form";
import MissionStatement from "./components/mission-statement";
import Text from "./components/text";
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
        ISWLogo,
        Text
    }
}

export default extendTheme(overrides)
