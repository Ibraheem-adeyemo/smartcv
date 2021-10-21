import { Grid, GridItem } from "@chakra-ui/layout"
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"
import React from "react"
import { ServiceStatus, SuccessRate, TerminalsPerformance, TerminalsUnderWatch } from "../component"
import { AuthenticatedLayout } from "../component/layouts"
import { links } from "../contants/links"

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
      </Grid>
    </AuthenticatedLayout>
  )
}

// checks for exixsting coookie session to redirect to the correct page
export async function getServerSideProps({ req, res }: { req: NextApiRequest, res: NextApiResponse }) {

  const session = await getSession({ req })

  if (!session) {
    res.setHeader("location", links.login)
    res.statusCode = 302;
    res.end();
  }

  return { props: {} }

}
export default Dashboard