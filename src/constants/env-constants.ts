export const NEXT_PUBLIC_PASSPORT_BASE_URL: Readonly<string> = typeof process.env.NEXT_PUBLIC_PASSPORT_BASE_URL !== "undefined" ? process.env.NEXT_PUBLIC_PASSPORT_BASE_URL : ""
export const SECRET: Readonly<string> = typeof process.env.NEXT_PUBLIC_SECRET !== "undefined" ? process.env.NEXT_PUBLIC_SECRET : "";
export const CLIENT_ID: Readonly<string> = typeof process.env.NEXT_PUBLIC_CLIENT_ID !== "undefined" ? process.env.NEXT_PUBLIC_CLIENT_ID : "";
export const CURRENT_API_VERSION: Readonly<string> = typeof process.env.NEXT_PUBLIC_CURRENT_API_VERSION !== "undefined" ? process.env.NEXT_PUBLIC_CURRENT_API_VERSION : ""
export const API_BASE_URL_ALTERNATIVE: Readonly<string> = typeof process.env.NEXT_PUBLIC_API_BASE_URL_ALTERNATIVE !== "undefined" ? process.env.NEXT_PUBLIC_API_BASE_URL_ALTERNATIVE : ""
export const API_BASE_URL: Readonly<string> = typeof process.env.NEXT_PUBLIC_API_BASE_URL !== "undefined" ? process.env.NEXT_PUBLIC_API_BASE_URL : API_BASE_URL_ALTERNATIVE
export const ALLOWED_APPS: Readonly<string> = typeof process.env.NEXT_PUBLIC_ALLOWED_APPS !== "undefined" ? process.env.NEXT_PUBLIC_ALLOWED_APPS : ""
