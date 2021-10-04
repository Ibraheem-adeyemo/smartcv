import { Route, Redirect } from "react-router-dom";
import React from "react";

const AuthenticatedRoute = ({ component, ...rest }) => {
  let loggedIn = false;
  const token = window.localStorage.getItem("user_token");
 
  if(!token)
  {
    loggedIn = true;
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? (
          React.createElement(component, props)
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state:{from: props.location}
            }}
            
          />
        )
      }
    />
  );
};

export default AuthenticatedRoute;
