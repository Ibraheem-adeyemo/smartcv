import { StatsA, StatsB, StatsC } from ".";

export interface GroupedBarChartProps {
    labels:string[]
    data: StatsC[]
    width?: string[] | string,
    height?: string[] | string
}

export interface DonutChartProps extends StatsB {
    width?: string[] | string, 
    height?:string[] |string
}

export interface StatProps extends StatsA {
    width?: string[], 
    height?: string[]
  }