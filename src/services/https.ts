import axios, { AxiosRequestConfig } from 'axios';
import { API_BASE_URL, cookieKeys, apiUrlsv1, SECRET, CLIENT_ID, grantTypes } from '../constants';
import { getCookie } from '../lib';
import { TokenResponsBody } from '../models';
import { postLoginAction } from './utils/AuthenticationUtilsFunctions';

const http = axios.create({
    baseURL: API_BASE_URL,
});

const refreshToken = async (refresh_token: string) => {
    const body = {
        refresh_token: refresh_token,
        grant_type: grantTypes.refreshToken,
    }
    try {
        const response = await http.post<TokenResponsBody>(apiUrlsv1.passportTokenUrl, {
            headers: {
                Authorization: `Basic ${btoa(CLIENT_ID + ':' + SECRET)}`,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body
        })
    
        if (typeof response !== "undefined") {
            // postLoginAction(response.access_token, response.refresh_token)
        }
    } catch (error) {
        
    }
}

http.interceptors.request.use(
    (config:AxiosRequestConfig) => {
        if(config.headers === undefined) {
            config.headers = {}
        }
        config.headers.Authorization = `Bearer ${getCookie(cookieKeys.token)}`
        return config;
    },

    error => {
        return Promise.reject(error)
    }
)

// Response interceptor for API calls
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if(error.response.status === 403){
            refreshToken(getCookie(cookieKeys.refreshToken))
        }
    }
);

export default http;