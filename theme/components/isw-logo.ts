import { Images } from "../../constants"

const ISWLogo = {
    // Styles for the base style
    baseStyle: {
        backgroundImage: `url('${Images.iswBlueLogo}')`,
        width:"156px",
        height:"42px",
        backgroundRepeat: "no-repeat"
    },
    // Styles for the size variations
    sizes: {},
    // Styles for the visual style variations
    variants: {
        "sidbar-logo": {
            height:"42px",
            width:"156px",
            marginY:"auto",
            marginLeft:"45px"
        },
        "inverted": {
            backgroundImage: `url('${Images.iswLogo}')`,
        }
    },
    // The default `size` or `variant` values
    defaultProps: {},
  }

  export default ISWLogo