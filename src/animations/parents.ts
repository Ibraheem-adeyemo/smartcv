import { Variants } from "framer-motion"

export const staggerChildrenWithDuration: Variants = {
    show: {
        opacity: 1,
        transition: {
            duration: 0.2,
            when: "beforeChildren",
            staggerChildren: 0.5
        }
    },
    hide: {
        opacity: 0,
        transition: {
            when: "afterChildren"
        }
    }
}

export const staggerChildren: Variants = {
    show: {
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.5
        }
    },
    hide: {
        transition: {
            when: "afterChildren"
        }
    }
}

export const delayChildren: Variants = {

    show: {
        opacity: 1,
        transition: {
            delayChildren: 0.4
        }
    },
    hide: {
        opacity: 0,
    }
}