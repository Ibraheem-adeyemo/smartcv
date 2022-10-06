import { StatsA, StatsB, StatsC, StatsCMore } from ".";

export interface GroupedBarChartProps extends StatsCMore {

}

export interface DonutChartProps extends StatsB {
    width?: string[] | string, 
    height?:string[] |string
}

export interface StatProps extends StatsA {
    width?: string[], 
    height?: string[],
    title: string
  }