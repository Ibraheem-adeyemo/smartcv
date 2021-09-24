import { Route, Redirect } from "react-router-dom";
import React from "react";

const AuthenticatedRoute = ({ component, ...rest }) => {
  const loggedIn = false;
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
            }}
          />
        )
      }
    />
  );
};

export default AuthenticatedRoute;
