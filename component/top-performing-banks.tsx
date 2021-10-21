import React, { useCallback } from "react";
import { StatsC } from "../models";
import { GroupedBarchart, StatCard } from "./stats";

export default function TopPerforminBanks(props: any) {

    const getStats = useCallback(() => {

        const boxSize = {
            width: ["224px", "224px", "224px", "224px", "224px", "222px"],
            height: ["159px", "159px", "159px", "159px", "159px", "189px"]
        }
        return [
            {
                ...boxSize,
                laels: ['Zenith', "FCMB", "First", "GTCO", "Access"],
                data: [
                    {
                        label: 'Value',
                        data: [2000000000, 1600000000, 203000000, 15600000, 13500000],
                        borderColor: "#62C6A6",
                        backgroundColor: "#096DD9",
                        borderWidth: 2,
                        borderRadius: Number.MAX_VALUE,
                        borderSkipped: false,
                    },
                    {
                        label: 'volume',
                        data: [206000000, 199600000, 10600000, 9600000, 7600000],
                        borderColor: "#62C6A6",
                        backgroundColor: "#62C6A6",
                        borderWidth: 2,
                        borderRadius: Number.MAX_VALUE,
                        borderSkipped: false,
                    }
                ],
            }
        ]
    }, [])
    return <StatCard<StatsC[]> getStats={getStats} statsComponent={GroupedBarchart} topic="What are the top performing 5 banks" />
}