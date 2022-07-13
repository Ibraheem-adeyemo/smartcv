import { Table, TableProps,TableBodyProps, TableRowProps, TableCellProps, Tr, Tbody, Td, Thead, TableHeadProps } from "@chakra-ui/react";
import { motion } from "framer-motion";

export const MotionTable = motion<TableProps>(Table)
export const MotionThead = motion<TableHeadProps>(Thead)
export const MotionTbody = motion<TableBodyProps>(Tbody)
export const MotionTr = motion<TableRowProps>(Tr)
export const MotionTd = motion<TableCellProps>(Td)