import { NextApiRequest, NextApiResponse, NextPage } from "next"
import { UserManagement as UserManagementComponent } from "../component/user-management"
import { Authenticated } from "../component/layouts"
import UserManagementTabProvider from "../provider/user-management-tab-provider"
import {Text} from "@chakra-ui/react"
const UserManagement:NextPage = () => {

    return (
        <Authenticated pageHeader={<Text px="50px" variant="page-header">User Management</Text>}>

            <UserManagementTabProvider>
                <UserManagementComponent />
            </UserManagementTabProvider>
        </Authenticated>)
}
export default UserManagement