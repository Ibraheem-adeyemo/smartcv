import { Box, BoxProps, ChakraComponent, forwardRef } from "@chakra-ui/react";
import { Chart, registerables } from "chart.js";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { GroupedBarChartProps } from "../../models";
import { Canvas } from ".";
import { shortenNumber } from "../../lib";

export default function GroupedBarchart(props: GroupedBarChartProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [minMax, setMinMax] = useState<{ min: number, max: number }>()
    const raw = useMemo(() => {
        const tempPaw: number[] = []
        props.data.forEach((x, i) => {
            tempPaw.push(...x.data)
        })
        return tempPaw
    }, [props.data])

    const data = useMemo(() => {
        const max = raw.reduce((prev, curr) => {
            if (curr > prev)
                return curr
            return prev
        }, 0)
        const min = raw.reduce((prev, curr) => {
            if (prev > curr)
                return curr
            return prev
        }, Number.MAX_VALUE) / 2

        setMinMax({ min: 0, max })
        //         const DATA_COUNT = 7;
        // const NUMBER_CFG = {count: DATA_COUNT, min: 2000000, max: 1000000000};

        // const labels  = Utils.months({count: 7});
        // alert(Utils.transparentize(Utils.CHART_COLORS.red, 0.5))
        return {
            labels: props.labels,
            datasets: props.data
        }
    }, [props.data, props.labels])

    useEffect(() => {
        console.log({ minMax })
        Chart.register(...registerables);
        const cv = canvasRef.current?.getContext('2d')
        const chart = new Chart(cv, {
            type: "bar",
            data,
            options: {
                scales: {
                    y: {
                        min: minMax?.min,
                        max: minMax?.max,
                        ticks: {
                            callback: (val, index) => {
                                const newLabel = shortenNumber(+val).fractionAmount !== Number.MAX_VALUE ? shortenNumber(+val) : { fractionAmount: val, abbrev: "" }
                                return raw.indexOf(+val) > -1 ? newLabel.fractionAmount + newLabel.abbrev : ""
                                // return newLabel.fractionAmount+newLabel.abbrev
                            },
                        }

                    }

                },
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Chart.js Bar Chart'
                    }
                }
            }
        })
        return () => {
            chart.destroy()
        }
        //  chart.options.plugins?.legend?.position = "right"
    })
    return <Canvas ref={canvasRef} w={props?.width} h={props?.height} as="canvas" mt="17px" />
}