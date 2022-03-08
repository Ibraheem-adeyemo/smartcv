import { NextApiRequest, NextApiResponse, NextPage } from "next"
import { UserManagement as UserManagementComponent } from "../src/component/user-management"
import { Authenticated } from "../src/component/layouts"
import {UserManagementTabProvider} from "../src/providers"
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