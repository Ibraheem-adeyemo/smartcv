import { Grid, GridItem } from "@chakra-ui/layout"
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"
import React, { useCallback } from "react"
import { ServiceStatus, StatCard, SuccessRate, TerminalsPerformance, TerminalsUnderWatch } from "../../component"
import { AuthenticatedLayout } from "../../component/layouts"

const Dashboard = () => {
  return (
    <AuthenticatedLayout pageHeader="User Dashboard">
      <Grid rowGap="27px" columnGap="15px" autoFlow="column" >
        <GridItem>
          <TerminalsPerformance />
        </GridItem>
        <GridItem>
          <SuccessRate />
        </GridItem>
        <GridItem>
          <ServiceStatus />
        </GridItem>
        <GridItem>
          <TerminalsUnderWatch />
        </GridItem>
      </Grid>
    </AuthenticatedLayout>
  )
}

// checks for exixsting coookie session to redirect to the correct page
export async function getServerSideProps({ req, res }: { req: NextApiRequest, res: NextApiResponse }) {

  const session = await getSession({ req })

  if (!session) {
    res.setHeader("location", '/login')
    res.statusCode = 302;
    res.end();
  }

  return { props: {} }

}
export default Dashboard