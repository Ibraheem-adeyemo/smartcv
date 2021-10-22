import { Grid, GridItem } from "@chakra-ui/layout"
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"
import React from "react"
import { ServiceStatus, SuccessRate, TerminalsPerformance, TerminalsUnderWatch, TopPerforminBanks, TopTransactionMetric } from "../component"
import { AuthenticatedLayout } from "../component/layouts"
import { links } from "../constants"
import { AuthGuard } from "../lib"

const Dashboard = () => {
  return (
    <AuthenticatedLayout pageHeader="User Dashboard">
      <Grid rowGap="27px" columnGap="15px" templateColumns={"1fr 1fr 1fr 1fr 1fr"} autoFlow="row dense" >
        <GridItem gridColumn={["1/5","1/5","1/5","1/5","1/5","1/5",]}>
          <TerminalsPerformance />
        </GridItem>
        <GridItem gridColumn={["5","5","5","5","5","5"]}>
          <SuccessRate />
        </GridItem>
        <GridItem gridColumn={["1/3","1/3","1/3","1/3","1/3","1/3",]}>
          <ServiceStatus />
        </GridItem>
        <GridItem gridColumn={["3/6","3/6","3/6","3/6","3/6","3/6"]}>
          <TerminalsUnderWatch />
        </GridItem>
        <GridItem gridColumn={["1/4","1/4","1/4","1/4","1/4","1/4"]}>
          <TopPerforminBanks />
        </GridItem>
        <GridItem gridColumn={["5/6","5/6","5/6","5/6","4/6","4/6"]}>
          <TopTransactionMetric />
        </GridItem>
      </Grid>
    </AuthenticatedLayout>
  )
}

// checks for exixsting coookie session to redirect to the correct page
export async function getServerSideProps({ req, res }: { req: NextApiRequest, res: NextApiResponse }) {
  return AuthGuard({ req, res })

}
export default Dashboard