import { Flex, Skeleton } from "@chakra-ui/react";
import { range } from "lodash";
import React, { FC } from "react";
import { keysForArrayComponents } from "../constants";
interface SkeletonLoaderProps {
    columns: number,
    rows: number,
    width?: string | string[],
    height?: string | string[],
    gap?: string,
    loaderKey: string
}
const SkeletonLoader: FC<SkeletonLoaderProps> = (props: SkeletonLoaderProps) => {
    const isHeightAvailable = props.height === null || typeof props.height === "undefined"
    const isGapAvailable = props.gap === null || typeof props.gap === "undefined"
    return <>
        {range(0, props.columns).map((x, i) =>
            <Flex key={`${keysForArrayComponents.flexSkeletonLoader}-${props.loaderKey}-${i}`} flexDir="column" w="fit-content" gap={isGapAvailable ? "10px" : props.gap} flexGrow={1}>
                {range(0, props.rows).map((y, j) =>
                    <Skeleton key={`${keysForArrayComponents.skeletonLoader}-${props.loaderKey}-${j}`} height={isHeightAvailable ? "40px" : props.height} width={props.width} />
                )}
            </Flex>)}
    </>
}

export default SkeletonLoader