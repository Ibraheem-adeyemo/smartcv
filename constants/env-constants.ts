export const PASSPORT_TOKEN_URL: Readonly<string> = typeof process.env.NEXT_PUBLIC_PASSPORT_TOKEN_URL !== "undefined" ? process.env.NEXT_PUBLIC_PASSPORT_TOKEN_URL : "";
export const PASSPORT_PROFILE_URL: Readonly<string>  = typeof process.env.NEXT_PUBLIC_PASSPORT_PROFILE_URL !== "undefined" ? process.env.NEXT_PUBLIC_PASSPORT_PROFILE_URL : "";
export const CLIENT_ID: Readonly<string>  = typeof process.env.NEXT_PUBLIC_CLIENT_ID !== "undefined" ? process.env.NEXT_PUBLIC_CLIENT_ID : "";
export const GRANT_TYPE: Readonly<string>  = typeof process.env.NEXT_PUBLIC_GRANT_TYPE !== "undefined" ? process.env.NEXT_PUBLIC_GRANT_TYPE : "";
export const REDIRECT_URI: Readonly<string>  = typeof process.env.NEXT_PUBLIC_REDIRECT_URI !== "undefined" ? process.env.NEXT_PUBLIC_REDIRECT_URI : "";
export const SECRET: Readonly<string>  = typeof process.env.NEXT_PUBLIC_SECRET !== "undefined" ? process.env.NEXT_PUBLIC_SECRET : "";
export const PASSPORT_AUTHORIZE_URL: Readonly<string>  = typeof process.env.NEXT_PUBLIC_PASSPORT_AUTHORIZE_URL !== "undefined"?process.env.NEXT_PUBLIC_PASSPORT_AUTHORIZE_URL:"";
export const SCOPE: Readonly<string>  = typeof process.env.NEXT_PUBLIC_SCOPE !== "undefined"? process.env.NEXT_PUBLIC_SCOPE : "";
export const RESPONSE_TYPE: Readonly<string>  = typeof process.env.NEXT_PUBLIC_RESPONSE_TYPE !== "undefined" ? process.env.NEXT_PUBLIC_RESPONSE_TYPE : "";
export const LOGIN_URL: Readonly<string>  = typeof process.env.NEXT_PUBLIC_LOGIN_URL !== "undefined" ? process.env.NEXT_PUBLIC_LOGIN_URL : ""
export const API_BASE_URL_ALTERNATIVE: Readonly<string>  = typeof process.env.NEXT_PUBLIC_API_BASE_URL_ALTERNATIVE !== "undefined" ? process.env.NEXT_PUBLIC_API_BASE_URL_ALTERNATIVE : ""
// export const API_BASE_URL: Readonly<string>  = typeof process.env.NEXT_PUBLIC_API_BASE_URL !== "undefined" ? process.env.NEXT_PUBLIC_API_BASE_URL : ""
export const API_BASE_URL: Readonly<string>  = API_BASE_URL_ALTERNATIVE
export const CURRENT_API_VERSION: Readonly<string>  = typeof process.env.NEXT_PUBLIC_CURRENT_API_VERSION !== "undefined" ? process.env.NEXT_PUBLIC_CURRENT_API_VERSION : ""
export const COOKIE_PASSWORD: Readonly<string>  = typeof process.env.NEXT_PUBLIC_COOKIE_PASSWORD !== "undefined"? process.env.NEXT_PUBLIC_COOKIE_PASSWORD:""