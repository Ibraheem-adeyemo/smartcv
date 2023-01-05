import { Button, Flex, Text } from "@chakra-ui/react";
import React, { useState, useEffect, useContext, FC } from "react";
import { Stat } from "../stats";
import { SkeletonLoader } from "..";
import { useLoading } from "../../hooks";
import {
  ATMInService,
  Paginate,
  StatsA,
  StatsProps,
  TransactionBreakdownType,
} from "../../models";
import { AuthContext, StatsContext } from "../../providers";
import { AppCard } from "../app";
import {
  apiUrlsv1,
  appRoles,
  cookieKeys,
  keysForArrayComponents,
  StatsName,
  upcomingFeature,
} from "../../constants";
import { fetchg, getCookie } from "../../lib";
import useSWR from "swr";

interface TransactionBreakdownProps {
  loading: { isLoading: boolean };
  stats: StatsProps[];
  setSelectedUrl: (url: string) => void;
  setSelectedHeaderName: (header: string) => void;
  width?: string | string[];
  headTitle?:string
  height?: string | string[];
  showDetails?: boolean;
}

export const TextChart: FC<TransactionBreakdownProps> = ({
  showDetails = false,
  headTitle = 'Transaction Breakdown',
  ...props
}: TransactionBreakdownProps) => {
  return (
    <AppCard
      topic={
        <Text variant="card-header" size="card-header">
          {headTitle}
        </Text>
      }
    >
      {!props?.loading.isLoading && props.stats ? (
        <Flex flexWrap={"wrap"} gap="15px">
          {" "}
          {props?.stats.map((x, i) => (
            <Button
              key={`${keysForArrayComponents.transactionBreakdownAppCard}-${i}`}
              disabled={x.comingSoon}
              opacity={x.comingSoon ? "0.4" : "1"}
              cursor={
                showDetails && !x.comingSoon && x.url ? "pointer" : "none"
              }
              onClick={() => {
                if (showDetails && x.url && !x.comingSoon) {
                  props.setSelectedUrl(`${x.url}/`);
                  props.setSelectedHeaderName(x.headerName);
                }
              }}
            >
              {x.comingSoon && (
                <Text
                  size="page-header"
                  variant="page-header"
                  sx={{
                    pos: "absolute",
                    zIndex: 10,
                  }}
                >
                  {upcomingFeature.stats}
                </Text>
              )}
              <Stat {...x} />
            </Button>
          ))}
        </Flex>
      ) : (
        <SkeletonLoader
          rows={1}
          columns={4}
          width={props.width}
          height={props.height}
          gap="30px"
          loaderKey={keysForArrayComponents.transactionBreakdownAppCard}
        />
      )}
    </AppCard>
  );
};
