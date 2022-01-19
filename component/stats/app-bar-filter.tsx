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
            {showToday && isToday && <Tag variant={"outline"} colorScheme={"brand"} bgColor={"brand.light-blue"}><Text variant={'dropdown-text-header'} size="tag-text">{filterDates.today}</Text></Tag>}
            {showToday && !isToday && <Tag cursor={"pointer"} onClick={() => toggleDate(filterDates.today)}><Text variant={'dropdown-text-header'} size="tag-text">{filterDates.today}</Text></Tag>}
            {showThisWeek && isThisWeek && <Tag variant={"outline"} colorScheme={"brand"} bgColor={"brand.light-blue"}><Text variant={'dropdown-text-header'} size="tag-text">{filterDates.thisWeek}</Text></Tag>}
            {showThisWeek && !isThisWeek && <Tag cursor={"pointer"} onClick={() => toggleDate(filterDates.thisWeek)}><Text variant={'dropdown-text-header'} size="tag-text">{filterDates.thisWeek}</Text></Tag>}
            {showThisMonth && isThisMonth && <Tag variant={"outline"} colorScheme={"brand"} bgColor={"brand.light-blue"}><Text variant={'dropdown-text-header'} size="tag-text">{filterDates.thisMonth}</Text></Tag>}
            {showThisMonth && !isThisMonth && <Tag cursor={"pointer"} onClick={() => toggleDate(filterDates.thisMonth)}><Text variant={'dropdown-text-header'} size="tag-text">{filterDates.thisMonth}</Text></Tag>}
            {showThisYear && isThisYear && <Tag variant={"outline"} colorScheme={"brand"} bgColor={"brand.light-blue"}><Text variant={'dropdown-text-header'} size="tag-text">{filterDates.thisYear}</Text></Tag>}
            {showThisYear && !isThisYear && <Tag cursor={"pointer"} onClick={() => toggleDate(filterDates.thisYear)}><Text variant={'dropdown-text-header'} size="tag-text">{filterDates.thisYear}</Text></Tag>}
            {showCustom && <CustomFilter />}
        </Flex>
    )
}
export default AppBarFilter