import { Flex, Tag, Text } from "@chakra-ui/react";
import React, { FC, useContext } from "react";
import { InstitutionFilter, CustomFilter } from ".";
import { filterDates } from "../../constants";
import { StatsContext } from "../../provider/stats-provider";

const AppBarFilter: FC = () => {
    const { showCustom, ShowTenant, showToday, showThisWeek, showThisMonth, showThisYear, isToday, isThisWeek, isThisMonth, isThisYear, toggleDate } = useContext(StatsContext)
    return (
        <Flex alignItems="center" gridGap="17px">
            {ShowTenant && <InstitutionFilter />}
            {showToday && <Tag variant={isToday ? "tag-outline" : ""} onClick={() => toggleDate(filterDates.today)}><Text variant={'dropdown-text-header'} size="tag-text">{filterDates.today}</Text></Tag>}
            {showThisWeek && <Tag variant={isThisWeek ? "tag-outline" : ""} onClick={() => toggleDate(filterDates.thisWeek)}><Text variant={'dropdown-text-header'} size="tag-text">{filterDates.thisWeek}</Text></Tag>}
            {showThisMonth && <Tag variant={isThisMonth ? "tag-outline" : ""} onClick={() => toggleDate(filterDates.thisMonth)}><Text variant={'dropdown-text-header'} size="tag-text">{filterDates.thisMonth}</Text></Tag>}
            {showThisYear && <Tag variant={isThisYear ? "tag-outline" : ""} onClick={() => toggleDate(filterDates.thisYear)}><Text variant={'dropdown-text-header'} size="tag-text">{filterDates.thisYear}</Text></Tag>}
            {showCustom && <CustomFilter />}
        </Flex>
    )
}
export default AppBarFilter