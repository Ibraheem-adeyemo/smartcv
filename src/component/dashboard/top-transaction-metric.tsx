import React, { FC, useEffect, useMemo, useState } from "react";
import { StatsCMore } from "../../models";
import { Barchart, SimpleBarchart, TotalTransactionBarChart } from "../app-charts";
import { Flex, Text } from "@chakra-ui/react";
import DropdownSearchFilter from "../stats/search-filters";
import { months } from "../../constants";
import { SkeletonLoader } from "..";
import { AppCard } from "../app";
import { AnimatedText } from "../framer";

const TopTransactionMetri:FC = () => {
    const Filter = useMemo(() => DropdownSearchFilter, [])

    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState<StatsCMore[]>()

    const dumData = [
        {
            value:0,
            // volume:4005,
            name:  'volume'
        },
        {
            // value:6005487654,
            volume:0,
            name:  'value'
        }
    ]
    useEffect(() => {
        const getStats = () => {

            setLoading(prev => !prev)
            return [
                {
                    labels: ["Value", "Volume"],
                    data: [
                        {
                            label: "Value",
                            data: [2450000000],
                            borderColor: "white",
                            backgroundColor: "#096DD9",
                            borderWidth: 2,
                            borderRadius: 2,
                            borderSkipped: false,
                        },
                        {
                            label: "Volume",
                            data: [2006000],
                            borderColor: "white",
                            backgroundColor: "#62C6A6",
                            borderWidth: 2,
                            borderRadius: 2,
                            borderSkipped: false,
                        }
                    ],
                }
            ]
        }
        setStats(getStats())
    }, [])

   
    return <AppCard topic={
        <Flex>
            <AnimatedText variant="card-header" size="card-header">Total Transction Metric</AnimatedText>
            <Flex>
                <Filter label="Month" data={months.map((x, i) => ({ value: i, label: x, selected: i === 0 ? true : false }))} />
            </Flex>
        </Flex>}

    >
        <TotalTransactionBarChart data={dumData} />
        {/* <SimpleBarchart data={stats} dataKey={dataKeys}  /> */}
        {/* {!loading ?
            <>
                <SimpleBarchart data={stats} dataKey={dataKeys}  />
                {/* {stats?.map((x, i) => <Barchart key={i} {...x} />)} 
            </> : <SkeletonLoader rows={1} columns={2} width="10px" height="200px" gap="30px" loaderKey="top-transaction-metric-app-card" />

        } */}
    </AppCard>
}

export default TopTransactionMetri