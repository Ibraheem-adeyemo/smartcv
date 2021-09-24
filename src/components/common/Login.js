import "../../css/login.css";

import { useEffect, useState } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";

import axios from "axios";

const Login = (props) => {
  const PASSPORT_TOKEN_URL = process.env.REACT_APP_PASSPORT_TOKEN_URL;
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const GRANT_TYPE = process.env.REACT_APP_GRANT_TYPE;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const SECRET = process.env.REACT_APP_SECRET;
  const PASSPORT_AUTHORIZE_URL = process.env.REACT_APP_PASSPORT_AUTHORIZE_URL;
  const SCOPE = process.env.REACT_APP_SCOPE;
  const RESPONSE_TYPE = process.env.REACT_APP_RESPONSE_TYPE;

  const PASSPORT_URL = "".concat(
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

  const [token, setToken] = useState();

  const [error, setError] = useState();

  const search = useLocation().search;
  const code = new URLSearchParams(search).get("code");

  useEffect(() => {
    getToken();
  }, [code]);

  const getToken = () => {
    if (code !== undefined && code !== null) {
      axios({
        url: PASSPORT_TOKEN_URL,
        method: "post",
        auth: {
          username: CLIENT_ID,
          password: SECRET,
        },
        params: {
          code: code,
          redirect_uri: REDIRECT_URI,
          grant_type: GRANT_TYPE,
          client_id: CLIENT_ID,
        },
      })
        .then((resp) => {
          let data = resp.data;
          if (data !== undefined && data != null) {
            setToken(data.access_token);
          }
        })
        .catch((error) => {
          setError("error login in");
        });
    }
  };

  if (token !== undefined && token !== null) {
    return <Redirect to="/paas/dashboard"></Redirect>;
  }

  return (
    <form className="formcontainer">
      <div className="frame3">
        <a
          className="button"
          href={
            PASSPORT_URL
          }
        >
          Login with passport
        </a>
        <p style={{ color: "red" }}>{error}</p>
        <Link to="/paas/auth/forgotpassword">Forgot your password?</Link>
      </div>
    </form>
  );
};

export default Login;
