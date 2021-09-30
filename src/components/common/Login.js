import "../../css/login.css";

import { useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";

import * as AuthenticationService from "../../service/AuthenticationService";

const Login = (props) => {
  const [token, setToken] = useState();
  const [refreshToken, setRefreshToken] = useState();

  const [error, setError] = useState();

  const search = useLocation().search;
  const code = new URLSearchParams(search).get("code");

  let locationState = null;

  if (props.location && props.location.state) {
    const locationState = props.location.state.from.pathname;
    window.localStorage.setItem("redirect_path", locationState);
  }

  useEffect(() => {
   
    if (code !== undefined && code !== null) {
      AuthenticationService.loginWithPassport(code)
        .then((resp) => {
          let data = resp.data;
          if (data !== undefined && data != null) {
            setToken(data.access_token);
            setRefreshToken(data.refresh_token);
          }
        })
        .catch((error) => {
          setError("error login in");
        });
    }
  }, [code]);

  useEffect(() => {
    window.localStorage.setItem("user_token", token);
  }, [token]);

  useEffect(() => {
    window.localStorage.setItem("user_refresh_token", refreshToken);
  }, [refreshToken]);

  const redirectPath = () => {
    const path = window.localStorage.getItem("redirect_path");
    if (path) {
      return path || "/paas/dashboard";
    }
    return "/paas/dashboard";
  };
  if (
    token !== undefined &&
    token !== null &&
    refreshToken !== undefined &&
    refreshToken !== null
  ) {
    return <Redirect to={redirectPath()}></Redirect>;
  }

  return (
    <form className="formcontainer">
      <div className="frame3">
        <a className="button" href={AuthenticationService.PASSPORT_URL}>
          Already onboarded on PAAS, Login with passport
        </a>

        <a className="button" href={AuthenticationService.PASSPORT_URL}>
          Not onboarded on PAAS, click here to register
        </a>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    </form>
  );
};

export default Login;
