import { Images } from "../../contants/image-constants"

const ISWLogo = {
    // Styles for the base style
    baseStyle: {
        backgroundImage: `url('${Images.iswBlueLogo}')`
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
        }
    },
    // The default `size` or `variant` values
    defaultProps: {},
  }

  export default ISWLogo