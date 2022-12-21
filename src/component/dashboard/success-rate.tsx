import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { DonutChart } from "../app-charts";
import { StatsB } from "../../models/stats-models";
import { Button, SkeletonCircle, Text } from '@chakra-ui/react'
import { AppCard } from "../app";
import SkeletonLoader from "../skeleton-loader";
import { keysForArrayComponents, upcomingFeature } from "../../constants";
import { AnimatedText } from "../framer";
import { StatsContext } from "../../providers";

interface SuccessRateProps {
    width: string[] | string,
    height: string[] | string,
    title: string
    colorsArr: string[]
    dataItmsArr: number[]
    labelsArr: string[]
    showDetail?:boolean,
    comingSoon?: boolean
}
interface InternaleSuccesRate extends StatsB {
    comingSoon?: boolean
    url?: string
}
const SuccessRate: FC<SuccessRateProps> = (props: SuccessRateProps) => {
    const { title, colorsArr, dataItmsArr, labelsArr, comingSoon } = props
    const [stats, setStats] = useState<InternaleSuccesRate[]>();
    const { dataDuration } = useContext(StatsContext)
    const getStats = useCallback(() => {
        const boxSize = {
            width: props.width,
            height: props.height,
            comingSoon: false,
            url: ""
        }
        return [{

            ...boxSize,
            data: dataItmsArr,
            labels: labelsArr,
            backgroundColor: colorsArr,
            chartTitle: "Success rate",
            comingSoon
        }]
    }, [])
    useEffect(() => {
        setStats(getStats())
    }, [])
    return (<AppCard topic={<><Text variant="card-header" size="card-header">{title}</Text><Text fontSize="12px" fontWeight={400}>{dataDuration}</Text></>}>
        <>
            {stats && stats.map((x, i) => (
                <Button position={x.comingSoon?"relative":"unset"} disabled={x.comingSoon} opacity={x.comingSoon? "0.4":"1"} key={`${keysForArrayComponents.successRateDonutChart}-${i}`}>
                    {x.comingSoon && <Text size="page-header" variant="page-header" sx={{
                        pos: "absolute",
                        zIndex: 10
                    }}>{upcomingFeature.stats}</Text>}
                    <DonutChart {...x} /> 
                </Button>
            ))}

            {!stats && <SkeletonLoader width={props.width} rows={1} columns={1} height={props.height} loaderKey={keysForArrayComponents.successRateDonutChart} />}
        </>

    </AppCard>)
}

export default SuccessRate