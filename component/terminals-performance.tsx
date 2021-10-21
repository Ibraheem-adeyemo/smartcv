import Icon from "@chakra-ui/icon";
import { Flex, Text } from "@chakra-ui/layout";
import React, { useCallback } from "react"
import { Stat, StatCard } from "./stats"
import { StatsA } from "../models/stats-models";
import { BsArrowUpCircle } from "react-icons/bs";


export default function TerminalsPerformance(props: any) {


  const getStats = useCallback(() => {
    const boxSize = {
      width: ["224px", "224px", "224px", "224px", "224px", "300px"],
      height: ["159px", "159px", "159px", "159px", "159px", "189px"]
    }
    return [{
      ...boxSize,
      headerName: "ATM Count",
      totalNumber: 1200,
      status: "green",
      percentage: "6.0%",
      days: "Last 7 days",

    }, {
      ...boxSize,
      headerName: "ATM Dispensing",
      totalNumber: 800,
      status: "green",
      percentage: "6.0%",
      days: "Last 7 days",
    }, {
      ...boxSize,
      headerName: "Not Dispensing",
      totalNumber: 120,
      status: "red",
      percentage: "6.0%",
      days: "Last 7 days"
    },]
  }
    , [])

  return (<StatCard<StatsA> getStats={getStats} topic="How are terminals performance" statsComponent={Stat} />)
}