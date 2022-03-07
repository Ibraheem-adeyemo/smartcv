import { apiUrlsv1, links, StatsName } from "."
import { channelsMonitoringTab, interchangeDisconnectionTab, Step, userManagementTab } from "../models"


export enum userManagementTabsName {
    bank = 'Bank',
    tenantAdmin = "tenantAdmin",
    iSWAdmin = "ISW Admin"
}

export const userManagementTabsSuperAdmin: Readonly<userManagementTab[]> = [
    {
        name: userManagementTabsName.bank,
        isSelected: true,
    }, {
        name: userManagementTabsName.tenantAdmin,
        isSelected: false
    }, {
        name: userManagementTabsName.iSWAdmin,
        isSelected: false
    }
]
export const userManagementTabsAdmin: Readonly<userManagementTab[]> = [{
    name: userManagementTabsName.tenantAdmin,
    isSelected: true
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


export const channelsMonitoringTabs: Readonly<channelsMonitoringTab[]> = [
    {
        name: StatsName.atmCount,
        url: apiUrlsv1.atmCountDetails,
        isSelected: true
    }, {
        name: StatsName.atmInService,
        url: apiUrlsv1.atmInServiceDetails,
        isSelected: false
    }, {
        name: StatsName.atmOutService,
        url: apiUrlsv1.atmOutOfServiceDetails,
        isSelected: false
    }, {
        name: StatsName.atmInSupervisor,
        url: apiUrlsv1.atmInSupervisorDetails,
        isSelected: false
    }, {
        name: StatsName.atmInCashJam,
        url: "",
        isSelected: false
    }, {
        name: StatsName.atmCassetteErrors,
        url: "",
        isSelected: false
    }
]

export enum interchangeDisconnectionTabsName {
    status = "Status",
    connectionRequest = "Connection Requestion"
}

export const interchangeDisconnectionTabs: Readonly<interchangeDisconnectionTab[]> = [
    {
        name: interchangeDisconnectionTabsName.status,
        url: apiUrlsv1.interchangeDisconnectionStatus,
        isSelected: true
    }, {
        name: interchangeDisconnectionTabsName.connectionRequest,
        url: apiUrlsv1.interchangeDisconnectionRequest,
        isSelected: false
    }
]

export enum onboardingCrossDomain {
    loading = "Loading",
    loaded = "Loaded",
    confirmKey = "Confirm Key",
    reconnect = "Reconnect"
}