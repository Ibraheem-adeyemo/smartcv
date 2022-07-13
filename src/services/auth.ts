import { UserSignupPayload } from "../models";
import http from "./https";

const apiRoutes = '/api/v1/users';

export const login = (email:string, password:string) => {
    http.post('', )
    const token = Buffer.from(`${email}:${password}`, 'utf8').toString('base64');
  // debugger
  return http.post('/oauth/token?grant_type=password&username=root&password=password&scope=write', null, {
    headers: {
      Authorization: `Basic '${token}'`,
    },
  })
}

export const signUp = (signupPayload: UserSignupPayload) => {
    return http.post('auth/signup', signupPayload)
}