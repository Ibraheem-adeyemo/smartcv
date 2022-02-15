import { Chart, registerables } from "chart.js";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { GroupedBarChartProps } from "../../models";
import { Canvas } from ".";
import { shortenNumber } from "../../lib";

const GroupedBarchart:FC<GroupedBarChartProps> = (props: GroupedBarChartProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [minMax, setMinMax] = useState<{ min: number, max: number }>()
    const raw = useMemo(() => {
        const tempPaw: number[] = []
        props.data.forEach((x) => {
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
        // console.log({ minMax })
        Chart.register(...registerables);
        const cv = canvasRef.current?.getContext('2d') as CanvasRenderingContext2D 
        const chart = new Chart(cv, {
            type: "bar",
            data,
            options: {
                maintainAspectRatio: false,
                scales: {
                    y: {
                        min: minMax?.min,
                        max: minMax?.max,
                        ticks: {
                            callback: (val) => {
                                const newLabel = shortenNumber(+val).fractionAmount !== Number.MAX_VALUE ? shortenNumber(+val) : { fractionAmount: val, abbrev: "" }
                                // return raw.indexOf(+val) > -1 ? newLabel.fractionAmount + newLabel.abbrev : ""
                                return newLabel.fractionAmount+newLabel.abbrev
                            },
                        }

                    }

                },
                responsive: false,
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
    }, [])
    return <Canvas ref={canvasRef} w={props?.width} h={props?.height} mt="17px" />
}
export default GroupedBarchart