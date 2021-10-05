import "../../css/login.css";
import handShake from "../../images/handshake.png";

import { useEffect, useState } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";

import * as AuthenticationService from "../../service/AuthenticationService";

const Login = (props) => {
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  const [error, setError] = useState();

  const search = useLocation().search;
  const code = new URLSearchParams(search).get("code");

  let locationState = null;

  if (props.location && props.location.state) {
    const locationState = props.location.state.from.pathname;
    window.localStorage.setItem("redirect_path", locationState);
  }

  useEffect(() => {
    if (code !== null) {
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
    if (token !== null || token !== "null") {
      window.localStorage.setItem("user_token", token);
    }
  }, [token]);

  useEffect(() => {
    if (refreshToken !== null && refreshToken !== "null") {
      window.localStorage.setItem("user_refresh_token", refreshToken);
    }
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
      <p className="welcome">Welcome</p>
      <img src={handShake} width="110px" height="110px" alt="hand shake" />
      <a className="button" href={AuthenticationService.PASSPORT_URL}>
        Already on boarded? Login
      </a>
      <p className="error">{error}</p>
      <p className="notRegistered">
        Not on boarded yet?{" "}
        <Link to="/paas/register/organization">Register</Link>
      </p>
    </form>
  );
};

export default Login;
