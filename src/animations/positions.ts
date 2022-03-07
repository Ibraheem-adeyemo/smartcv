import { Variants } from "framer-motion";

export const verticalPosition:Variants = {
    show: {
        y: 0,
        transition: { duration: 0.85 }
    },
    hide: {
        y: "200%",
        transition: { duration: 0.75 }
    }
}