import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { channelsMonitoringContext } from "../../providers";
import { MotionButton, MotionButtonGroup } from "../framer";

const ChannelsMonitoringTabs: FC = () => {
  const { tabs, modifyTab } = useContext(channelsMonitoringContext)
  const handleTabSelection = (i: number) => {

    modifyTab({ ...tabs[i], isSelected: true }, i)
  }
  useEffect(() => {
    // console.log({tabs})
  }, [tabs])
  return (<MotionButtonGroup spacing="0" animate="show" initial="hide" variants={{
    hide: {
      opacity: 0

    },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        duration: 0.4
      }
    }
  }}>
    {tabs.map((x, i, arr) => <MotionButton animate="show" initial="hide" variants={{
      show: {
        opacity: 1,
        transition:{
          duration: 0.4,
          delay: 0.3 * i
        }
      },
      hide: {
        opacity: 0
      }
    }} isActive={x.isSelected} key={i} px="20px" py="11px" borderTopLeftRadius={i === 0 ? "4px" : "0px"} borderBottomLeftRadius={i === 0 ? "4px" : "0px"} borderTopRightRadius={(i + 1) === arr.length ? "4px" : "0px"} borderBottomRightRadius={(i + 1) === arr.length ? "4px" : "0px"} colorScheme="blue" variant="outline" onClick={(e) => handleTabSelection(i)}>{x.name}</MotionButton>)}
  </MotionButtonGroup>)
}
export default ChannelsMonitoringTabs
