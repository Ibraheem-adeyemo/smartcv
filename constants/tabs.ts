import { apiUrlsv1, links } from "."
import { channelsMonitoringTab, Step, userManagementTab } from "../models"


export enum userManagementTabsName {
    bank = 'Bank',
    tenantAdmin = "tenantAdmin",
    iSWAdmin = "ISW Admin"
}

export const userManagementTabs: Readonly<userManagementTab[]> = [
    {
        name: userManagementTabsName.bank,
        isSelected: false
    }, {
        name: userManagementTabsName.tenantAdmin,
        isSelected: false
    }, {
        name: userManagementTabsName.iSWAdmin,
        isSelected: false
    }
]
export const onboardingTabs: Readonly<Step[]> = [
    {
        name: "Create bank",
        description: "Provide bank information and validation code",
        url: links.createBank,
        key: "tenant"
    }, {
        name: "Create Super Admin",
        description: "Enter superadmin information and create user",
        url: links.createSuperAdmin,
        key: "tenantAdmin"
    }, {
        name: "Institution colors",
        description: "Select the color scheme for the institution",
        url: links.institutionColors,
        key: "institutionColorInfo"
    }
]
export const channelsMonitorinTabs:Readonly<channelsMonitoringTab[]> = [
    {
        name:"ATM Count",
        url:apiUrlsv1.atmCountDetails,
        isSelected:true
    }, {
        name:"Total in Service",
        url:apiUrlsv1.atmInServiceDetails,
        isSelected:false
    }, {
        name:"Total Out of Service",
        url:apiUrlsv1.atmOutOfServiceDetails,
        isSelected:false
    }, {
        name:"ATM In-Supervisor",
        url:apiUrlsv1.atmInSupervisorDetails,
        isSelected:false
    }, {
        name:"ATM In Cash-Jam",
        url:"",
        isSelected:false
    }, {
        name:"ATM Cassete Errors",
        url:"",
        isSelected:false
    }
]
