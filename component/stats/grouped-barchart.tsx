import { Box } from "@chakra-ui/react";
import { Chart, registerables } from "chart.js";
import React, { useEffect, useMemo, useRef } from "react";
import { GroupedBarChartProps } from "../../models";

export default function GroupedBarchart(props: GroupedBarChartProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);


    const data = useMemo(() => {
        //         const DATA_COUNT = 7;
        // const NUMBER_CFG = {count: DATA_COUNT, min: 2000000, max: 1000000000};

        // const labels  = Utils.months({count: 7});
        // alert(Utils.transparentize(Utils.CHART_COLORS.red, 0.5))
        return{
        labels: props.labels,
        datasets: props.data
    }
}, [props.data, props.labels, props?.height, props?.width])

    useEffect(() => {
        // debugger
        Chart.register(...registerables);
        const cv = canvasRef.current?.getContext('2d')
        const chart = new Chart(cv, {
            type: "bar",
            data,
            options: {
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

    return <Box w={props?.width} h={props?.height} mt="17px"><canvas id="my-chart" ref={canvasRef}></canvas></Box>
}