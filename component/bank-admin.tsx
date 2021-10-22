import { useMemo } from "react";
import { AppTable } from ".";
import { Banks } from "../constants";
import { getRandomInt } from "../lib";

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
                    alert("Edit")
                }
            },
            {
                name: "Delete",
                icons:{
                    use: true,
                },
                method: () => {
                    alert("Delete")
                }
            },
            {
                name: "View",
                icons:{
                    use: true
                },
                method: () => {
                    alert("View")
                }
            },
        ],
        data: (() => {
            const data = []
            for (let i = 0; i < 38; i++) {
                data.push({
                    bankName: Banks[getRandomInt(Banks.length - 1)],
                    bankLogo: "",
                    bankId: "7638GFTJ876",
                    addrress: "Bank Address",
                    dateCreated: (new Date()).getDate().toString(),
                    babnkSuperAdmin: "John Wick",
                    status: "John wick"
                })
            }
            return data
        })()
    }), [])
    return (<AppTable actions={data.actions} columns={data.columns} rows={data.data} />)
}