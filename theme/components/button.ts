const Button = {
    // Styles for the base style
    baseStyle: {
    },
    // Styles for the size variations
    sizes: {
        "base-size": {
            fontSize: "14px",
        }
    },
    // Styles for the visual style variations
    variants: {
        "just-text": {
            color: "brand.primary-text",
            bgColor: "white"
        },
        "primary-button": {

            borderRadius: "48px",
            py: "5.5px",
            px: "22.5px",
            bgColor: "brand.primary-blue",
            color: "white"
        },
        "muted-primary-button": {

            borderRadius: "48px",
            py: "5.5px",
            px: "22.5px",
            bgColor: "brand.muted-blue",
            color: "brand.primary-blue"
        }
    },
    // The default `size` or `variant` values
    defaultProps: {
        size: "base-size"
    },
}

export default Button