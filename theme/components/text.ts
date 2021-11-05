const Text = {
    // Styles for the base style
    baseStyle: {
      color: "brand.primary-text",
      fontFamily: "Averta",
      fontStyle: "normal",
      
    },
    // Styles for the size variations
    sizes: {
      "card-header": {
        fontSize: "18px",
      },
      "stat-header":{
        fontSize: ["16px", "16px", "16px", "16px", "16px", "20px"]
      },
      "page-header": {
        fontSize:"23px"
      },
      "dropdown-text": {
        fontSize:"14px"
      },
      "tag-text": {
        fontSize:"12px"
      },
      "tiny-text": {
        fontSize:"8px"
      },
      "extra-large-text": {
        fontSize:"34px"
      }
    },
    // Styles for the visual style variations
    variants: {
        "card-header":{
          fontWeight:800
        },
        "page-header": {
          color: "brand.page-header",
          size: "page-header",
          fontWeight:700,
        },
        "stat-header": {
          color:"sbrand.stat_header",
          size: "stat-header",
          fontWeight:600,
        },
        "small-muted-text": {
          fontSize:"11px",
          fontWeight:400,
          color:"#353F50"
        },
        "drop-down-text-header": {
          fontWeight:700
        }

    },
    // The default `size` or `variant` values
    defaultProps: {
    },
  }

  export default Text