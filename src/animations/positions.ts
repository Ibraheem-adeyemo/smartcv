import { Variants } from "framer-motion";

export const verticalPosition: Variants = {
    show: {
        y: 0,
        transition: { duration: 0.85 }
    },
    hide: {
        y: "200%",
        transition: { duration: 0.75 }
    }
}

export const verticalPositionWithOpacity: Variants = {
    show: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.4
        }
    },
    hide: {
        y: "100%",
        opacity: 0,
        transition: {
            duration: 0.4
        }
    }
}
type horizontalPositionWithOpacityFunc = (i: number) => Variants
export const horizontalPositionWithOpacity: horizontalPositionWithOpacityFunc = (i: number) => ({
    show: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.4,
            delay: i * 0.4
        }
    },
    hide: {
        x: -200,
        opacity: 0
    }
})