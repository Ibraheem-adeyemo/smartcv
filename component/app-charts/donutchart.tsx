import React, { useMemo, useEffect, useRef, FC } from "react";
import { Chart, registerables } from 'chart.js';
import { DonutChartProps } from "../../models";
import { Canvas } from ".";


const DonutChart:FC<DonutChartProps> = (props: DonutChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);


  const data = useMemo(() => ({
    labels: props.labels,
    datasets: [{
      label: props.chartTitle,
      data: props.data,
      backgroundColor: props.backgroundColor,
      hoverOffset: 4
    }]
  }), [props.backgroundColor, props.chartTitle, props.data, props.labels])

  useEffect(() => {
    // debugger
    Chart.register(...registerables);
    const cv = canvasRef.current?.getContext('2d') as CanvasRenderingContext2D 
    const chart = new Chart(cv, {
      type: "doughnut",
      data,
      options: {
        plugins: {
          legend: {
            position: "right"
          }
        },
        maintainAspectRatio: false
      }
    })
    return () => {
      chart.destroy()
    }
    //  chart.options.plugins?.legend?.position = "right"
  }, [])

  return <Canvas ref={canvasRef} w={props?.width} h={props?.height} as="canvas" mt="17px" />
}

export default DonutChart