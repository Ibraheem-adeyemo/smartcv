import { Flex, Skeleton } from "@chakra-ui/react";
import { range } from "lodash";
import React, { FC } from "react";
interface SkeletonLoaderProps {
    columns: number,
    rows: number,
    width: string | string[],
    height?: string | string[],
    gridGap?:string
}
const SkeletonLoader:FC<SkeletonLoaderProps> = (props: SkeletonLoaderProps) => {

    return <>
        {range(0, props.columns).map((x, i) =>
            <Flex key={i} flexDir="column" w="fit-content" gridGap={ props.gridGap === null || typeof props.gridGap === "undefined"?"10px":props.gridGap} flexGrow={1}>
                {range(0, props.rows).map((y, j) =>
                    <Skeleton key={j} height={props.height === null || typeof props.height === "undefined" ? "40px" : props.height} width={props.width} />
                )}
            </Flex>)}
    </>
}

export default SkeletonLoader