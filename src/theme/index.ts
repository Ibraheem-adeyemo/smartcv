import { extendTheme } from "@chakra-ui/react";
import colors from "./foundations/colors";
import styles from "./style";
import { components } from "./components";
import { breakpoints } from "./breakpoints";


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
    components,
    breakpoints

}

export default extendTheme(overrides)
