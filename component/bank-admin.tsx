import { useMemo } from "react";
import { AppTable } from ".";

export default function BankAdmin() {

    const data = useMemo(() => ({
        columns: [
            {
                name: "Bank Logo",
                key: "bankLogo"
            }, {
                name: "Bank name",
                key: "bankName"
            }, {
                name: "Bank ID",
                key: "bankID"
            }, {
                name: "Address",
                key: "address"
            }, {
                name: "Date Created",
                key: "dateCreated"
            }, {
                name: "Bank Super Admin",
                key: "babnkSuperAdmin"
            }, {
                name: "Status",
                key: "status"
            }
        ],
        actions: [
            {
                name: "Edit",
                icons:{
                    use: true
                },
                method: () => {
                    alert("done")
                }
            },
            {
                name: "Delete",
                icons:{
                    use: true,
                },
                method: () => {
                    alert("done")
                }
            },
            {
                name: "View",
                icons:{
                    use: true
                },
                method: () => {
                    alert("done")
                }
            },
        ],
        data: (() => {
            const data = []
            for (let i = 0; i < 38; i++) {
                data.push({
                    bankName: "",
                    bankLogo: "",
                    bankId: "",
                    addrress: "",
                    dateCreated: "",
                    babnkSuperAdmin: "",
                    status: "",
                    activeUsers: 0,
                    inActiveUser: 0
                })
            }
            return data
        })()
    }), [])
    return (<AppTable actions={data.actions} columns={data.columns} rows={data.data} />)
}