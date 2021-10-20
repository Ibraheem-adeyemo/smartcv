const Text = {
    // Styles for the base style
    baseStyle: {
      color: "brand.text",
      fontFamily: "Averta",
      fontStyle: "normal",
      
    },
    // Styles for the size variations
    sizes: {
      "card-header": {
        fontSize: "16px"
      },
      "stat-header":{
        fontsize:"16px"
      },
      "page-header": {
        fontSize:"23px"
      }
    },
    // Styles for the visual style variations
    variants: {
        "card-header":{
          fontWeight:800,
          marginBottom:"16px"
        },
        "page-header": {
          color: "brand.page_header",
          size: "page-header"
        },
        "stat-header": {
          color:"sbrand.stat_header",
          size: "stat-header",
          fontWeight:600,
        }
    },
    // The default `size` or `variant` values
    defaultProps: {
    },
  }

  export default Text