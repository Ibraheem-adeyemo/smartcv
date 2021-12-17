import { links } from ".";
console.log({links})
export const AuthenticatedPage: Readonly<string[]> = typeof links !== "undefined"? [
    links.dashboard,
    links.userManagement,
    links.channelsMonitoring,
    links.transactionMonitoring,
    links.audit
]:[]