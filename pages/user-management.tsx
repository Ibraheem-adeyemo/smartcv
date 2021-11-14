import { NextApiRequest, NextApiResponse } from "next"
import { UserManagement as UserManagementComponent } from "../component/user-management"
import { Authenticated } from "../component/layouts"
import UserManagementTabProvider from "../provider/user-management-tab-provider"

export default function UserManagement(_props:any) {

    return (<Authenticated pageHeader="User Management">
        
        <UserManagementTabProvider>
            <UserManagementComponent />
        </UserManagementTabProvider>
    </Authenticated>)
}
