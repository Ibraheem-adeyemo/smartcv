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
import Input from "./components/input";
import Select from "./components/select";

const breakpoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
})

/*
  300px: From 0em upwards
  400px: From 30em upwards
  500px: From 48em upwards
*/
const overrides = {
    styles,
    colors,
    fonts: {
      body: "avertastd-regularuploadedfile"
    },
    components: {
        LoginForm,
        ImageBackground,
        ISWLogo,
        Text,
        Tag,
        Button,
        Link,
        Input,
        Select
    },
    breakpoints

}

export default extendTheme(overrides)
