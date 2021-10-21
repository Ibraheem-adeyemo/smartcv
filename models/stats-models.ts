
export interface StatsA {
    headerName: string;
    totalNumber: number;
    status: string;
    percentage: string;
    days: string;
}

export interface StatsB {
    data: number[];
    labels: string[];
    backgroundColor: string[];
    chartTitle: string;
}

export interface StatsC {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    borderWidth: number;
    borderRadius: number;
    borderSkipped: boolean;
}