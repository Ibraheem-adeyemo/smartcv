import { Accordion, AccordionItem, AccordionItemProps, AccordionProps } from "@chakra-ui/react";
import { motion } from "framer-motion";

export const MotionAccordion = motion<AccordionProps>(Accordion)
export const MotionAccordionItem = motion<AccordionItemProps>(AccordionItem)


