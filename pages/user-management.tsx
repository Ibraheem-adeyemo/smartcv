import { NextApiRequest, NextApiResponse } from "next"
import { AuthenticatedLayout } from "../component/layouts"
import { AuthGuard } from "../lib"

export default function UserManagement(props:any) {

    return (<AuthenticatedLayout>
        
    </AuthenticatedLayout>)
}


// checks for exixsting coookie session to redirect to the correct page
export async function getServerSideProps({ req, res }: { req: NextApiRequest, res: NextApiResponse }) {
    return AuthGuard({ req, res })
  
  }