import { Variants } from "framer-motion"

type appearFunc = (i?:number) => Variants
export const appear: appearFunc = (i=0) =>({

    show: {
        opacity: 1,
        transition: {
            duration: 0.4,
            delay: i * 0.3
        }
    },
    hide: {
        opacity: 0,
        transition: {
            duration: 0.4,
            delay: i * 0.3
        }
    }
})
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