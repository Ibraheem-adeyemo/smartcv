import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"
import { AuthenticatedLayout } from "../../component/layouts"

const Dashboard = () => {
    return <AuthenticatedLayout>
      Welcome to Dashboard
    </AuthenticatedLayout>
}

// checks for exixsting coookie session to redirect to the correct page
export async function getServerSideProps({req, res}:{req:NextApiRequest, res:NextApiResponse}) {
  
    const session = await getSession({ req })
  
    if(!session){
      res.setHeader("location",'/login')
      res.statusCode = 302;
      res.end();
    }
    
    return { props: {} }
  
  }
export default Dashboard