import { links } from ".";


export const AuthenticatedPage: Readonly<string[]> = typeof links !== "undefined"? [
    links.dashboard,
    links.transactionMonitoring,
    links.channelsMonitoring,
    links.interchangeDisconnection,
    links.userManagement,
    links.audit,
]:[]