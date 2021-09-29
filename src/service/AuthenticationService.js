
import axios from 'axios';

const PASSPORT_TOKEN_URL = process.env.REACT_APP_PASSPORT_TOKEN_URL;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const GRANT_TYPE = process.env.REACT_APP_GRANT_TYPE;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const SECRET = process.env.REACT_APP_SECRET;
const PASSPORT_AUTHORIZE_URL = process.env.REACT_APP_PASSPORT_AUTHORIZE_URL;
const SCOPE = process.env.REACT_APP_SCOPE;
const RESPONSE_TYPE = process.env.REACT_APP_RESPONSE_TYPE;

export const PASSPORT_URL = "".concat(
  PASSPORT_AUTHORIZE_URL,
  "?",
  "client_id=",
  CLIENT_ID,
  "&redirect_uri=",
  REDIRECT_URI,
  "&scope=",
  SCOPE,
  "&response_type=",
  RESPONSE_TYPE
);


export const loginWithPassport= (code) => 
{
        return axios({
          url: PASSPORT_TOKEN_URL,
          method: "post",
          auth: {
            username: CLIENT_ID,
            password: SECRET,
          },
          params: {
            client_id: CLIENT_ID,
            redirect_uri: REDIRECT_URI,
            grant_type: GRANT_TYPE,  
            code: code    
          },
        });
}