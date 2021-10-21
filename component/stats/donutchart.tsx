import { Box } from "@chakra-ui/layout";
import { useRef, useImperativeHandle, forwardRef, useLayoutEffect, RefObject, useMemo, useEffect } from "react";
import { Chart, registerables } from 'chart.js';
import { DonutChartProps } from "../../models";


export default function DonutChart (props:DonutChartProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    
    const data = useMemo(() => ({
        labels: props.labels,
          datasets: [{
            label: props.chartTitle,
            data: props.data,
            backgroundColor: props.backgroundColor,
            hoverOffset: 4
          }]
    }), [props.backgroundColor, props.chartTitle, props.data, props.labels, props?.height, props?.width])

    useEffect(() => {
      // debugger
      Chart.register(...registerables);
     const cv = canvasRef.current?.getContext('2d')
     const chart = new Chart(cv, {
        type: "doughnut",
         data,
         options: {
           plugins: {
             legend:{
               position: "right"
             }
           },
           maintainAspectRatio:false
         }
     })   
     return () => {
       chart.destroy()
     }
    //  chart.options.plugins?.legend?.position = "right"
    })

    return <Box w={props?.width} h={props?.height}  mt="17px"><canvas id="my-chart" ref={canvasRef}></canvas></Box>
}
