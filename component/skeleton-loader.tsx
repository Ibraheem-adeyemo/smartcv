import { Flex, Skeleton } from "@chakra-ui/react";
import { range } from "lodash";
import React from "react";
interface SkeletonLoaderProps {
    itemRange: [number, number],
    skeletonRange: [number, number],
    width: string | string[],
    height?: string | string[],
    gridGap?:string
}
export default function SkeletonLoader(props: SkeletonLoaderProps) {

    return <>
        {range(props.itemRange[0], props.itemRange[1]).map((x, i) =>
            <Flex key={i} flexDir="column" w="100%" gridGap={ props.gridGap === null || typeof props.gridGap === "undefined"?"10px":props.gridGap} flexGrow={1}>
                {range(props.skeletonRange[0], props.skeletonRange[1]).map((y, j) =>
                    <Skeleton key={j} height={props.height === null || typeof props.height === "undefined" ? "40px" : props.height} width={props.width} />
                )}
            </Flex>)}
    </>
}