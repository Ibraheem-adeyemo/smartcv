import { extendTheme } from "@chakra-ui/react";
import ImageBackground from "./components/image-background";
import ISWLogo from "./components/isw-logo";
import LoginForm from "./components/login-form";
import Text from "./components/text";
import colors from "./foundations/colors";
import styles from "./style";
import Button from "./components/button";


import { createBreakpoints } from "@chakra-ui/theme-tools"
import Tag from "./components/tag";
import Link from "./components/link";

const breakpoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
})
const overrides = {
    styles,
    colors,
    components: {
        LoginForm,
        ImageBackground,
        ISWLogo,
        Text,
        Tag,
        Button,
        Link
    },
    breakpoints

}

export default extendTheme(overrides)
