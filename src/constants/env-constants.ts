export const PUBLIC_PASSPORT_BASE_URL: Readonly<string> = typeof process.env.REACT_APP_PASSPORT_BASE_URL !== "undefined" ? process.env.REACT_APP_PASSPORT_BASE_URL : ""
export const SECRET: Readonly<string> = typeof process.env.REACT_APP_SECRET !== "undefined" ? process.env.REACT_APP_SECRET : "";
export const CLIENT_ID: Readonly<string> = typeof process.env.REACT_APP_CLIENT_ID !== "undefined" ? process.env.REACT_APP_CLIENT_ID : "";
export const CURRENT_API_VERSION: Readonly<string> = typeof process.env.REACT_APP_CURRENT_API_VERSION !== "undefined" ? process.env.REACT_APP_CURRENT_API_VERSION : ""
export const API_BASE_URL_ALTERNATIVE: Readonly<string> = typeof process.env.REACT_APP_API_BASE_URL_ALTERNATIVE !== "undefined" ? process.env.REACT_APP_API_BASE_URL_ALTERNATIVE : ""
export const API_BASE_URL: Readonly<string> = typeof process.env.REACT_APP_API_BASE_URL !== "undefined" ? process.env.REACT_APP_API_BASE_URL : API_BASE_URL_ALTERNATIVE
export const ALLOWED_APPS: Readonly<string> = typeof process.env.REACT_APP_ALLOWED_APPS !== "undefined" ? process.env.REACT_APP_ALLOWED_APPS : ""
