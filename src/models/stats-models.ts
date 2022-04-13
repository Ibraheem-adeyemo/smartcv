
export interface StatsA {
    headerName: string;
    totalNumber: number;
    status: string;
    percentage: string;
    days: string;
    prefix:string,
    suffix:string,
    url?:string
}

export interface DropdownSearchFilterProps {
    data: DropdownContent[],
    label?: string,
    selected?: boolean,
    onSelected?: (selectedItem: DropdownContent) => void
}


export interface DropdownContent {
    label: any,
    value: any,
    selected: boolean
}
export type ResultFromSearch = (items?: DropdownContent[]) => void

export interface StatsB {
    data: number[];
    labels: string[];
    backgroundColor: string[];
    chartTitle: string;
}

export interface StatsC {
    label: string,
    data: number[],
    borderColor: string,
    backgroundColor: string| string[],
    borderWidth: number,
    borderRadius: number,
    borderSkipped: any
}

export interface StatsCMore {
    labels: string[],
    data: StatsC[],
    width?: string[] | string,
    height?: string[] | string
}