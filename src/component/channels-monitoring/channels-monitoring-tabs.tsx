import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { appear } from "../../animations";
import { keysForArrayComponents } from "../../constants";
import { channelsMonitoringContext } from "../../providers";
import { MotionButton, MotionButtonGroup } from "../framer";

const ChannelsMonitoringTabs: FC = () => {
  const { tabs, modifyTab } = useContext(channelsMonitoringContext)
  const handleTabSelection = (i: number) => {

    modifyTab({ ...tabs[i], isSelected: true }, i)
  }
 
  return (
    <MotionButtonGroup spacing="0" animate="show" initial="hide" variants={appear(1)}>
      {tabs.map((x, i, arr) => x.url && (
        <MotionButton animate="show" initial="hide" variants={appear(i)} isActive={x.isSelected} key={`${keysForArrayComponents.channelsMonitoringTabButton}-${i}`} px="20px" py="11px" borderTopLeftRadius={i === 0 ? "4px" : "0px"} borderBottomLeftRadius={i === 0 ? "4px" : "0px"} borderTopRightRadius={(i + 1) === arr.length ? "4px" : "0px"} borderBottomRightRadius={(i + 1) === arr.length ? "4px" : "0px"} colorScheme="blue" variant="outline" onClick={(e) => handleTabSelection(i)}>{x.name}</MotionButton>
        ))
      }
    </MotionButtonGroup>
  )
}
export default ChannelsMonitoringTabs
