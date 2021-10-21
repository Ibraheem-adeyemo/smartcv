import Icon from "@chakra-ui/icon";
import { Flex, Text } from "@chakra-ui/layout";
import React, { useCallback } from "react"
import { Stat, StatCard } from "."
import { StatsA } from "../models/stats-models";
import { BsArrowUpCircle } from "react-icons/bs";


export default function ServiceStatus(props: any) {


  const getStats = useCallback(() => {
    
    const boxSize = {
      width: ["224px", "224px", "224px", "224px", "224px", "222px"],
      height: ["159px", "159px", "159px", "159px", "159px", "189px"]
    }
    return [{
      
      ...boxSize,
      headerName: "ATM In Service",
      totalNumber: 1200,
      status: "green",
      percentage: "6.0%",
      days: "Last 7 days"
    }, {
      ...boxSize,
      headerName: "ATM Out Service",
      totalNumber: 500,
      status: "green",
      percentage: "6.0%",
      days: "Last 7 days"
    },]
  }, [])

  return (<StatCard<StatsA> getStats={getStats} topic="What is our service" statsComponent={Stat} />)
}