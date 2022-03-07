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
    }
}
interface apperWithDimensionsPros {
    width?:string,
    height?:string
}
export const apperWithDimensions = ({width="fit-content", height="fit-content"}: apperWithDimensionsPros): Variants => ({
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
        width: 0
    }
})