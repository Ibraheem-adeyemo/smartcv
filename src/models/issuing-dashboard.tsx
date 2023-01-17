export interface IssuingTransactionMetrics {
    amount:number
    tenantCode:string
    tranId:number
    volume:number
}

type StrokeType = {
    hasStroke: boolean;
    strokeDasharray: string;
  };

  export interface DataProps {
    data: IssuingFaileSuccessPropsData[];
    distribution?:string
    barSize?: number;
  tickCount?: number;
    type?: "number" | "category";
    domain?: string[] | number[];
    interval?: number;
  }
 
  type ContainerType = {
    width: string;
    height: string;
  };
  
  type LineObject = {
    type: string;
    dataKey: string;
    name:string
    stroke: string;
    activeDot?: object;
  };
  export interface IssuingLineChartProps {
    lines: LineObject[];
    width: number;
    height: number;
    dataKey: string;
    stroke: StrokeType;
    data: IssuingFaileSuccessPropsData[];
    container: ContainerType;
  }

export interface IssuingFaileSuccessProps {
    data: IssuingFaileSuccessPropsData[]
}
   
type Data = {
    name?: string;
    failed?: number;
    Successful?: number;
    amt?: number;
    duration: string,
    failedCount: number,
    successCount: number      
  };

export interface IssuingFaileSuccessPropsData {
    date:string
    duration:string
    failedCount:string|number
    failedValue:string|number
    successCount:string|number
    successValue:string|number
}

type ChannelProps = {
    channel:string
    count:string|number
    value:string|number
}

export interface IssuingBarChartProps {
  data: ChannelProps[];
  labelY: string;
  labelX: string;
}