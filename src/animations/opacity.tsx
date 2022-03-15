import { Variants } from "framer-motion"

export const appear: Variants = {

    show: {
        opacity: 1,
        transition: {
            duration: 0.4
        }
    },
    hide: {
        opacity: 0,
        transition: {
            duration: 0.4
        }
    }
}
interface appearWithDimensionsPros {
    width?:string,
    height?:string
}
export const appearWithDimensions = ({width="fit-content", height="fit-content"}: appearWithDimensionsPros): Variants => ({
    show: {
        opacity: 1,
        height,
        width,
        transition: {
            duration: 0.4
        }
    },
    hide: {
        opacity:0,
        height: 0,
        width: 0,
        transition: {
            duration: 0.4
        }
    }
})