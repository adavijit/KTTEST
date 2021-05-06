import React from "react";
import { Route, Redirect } from "react-router-dom";

function checkLoggedIn() {
  if (sessionStorage.getItem("u_email")) {
    return true;
  } else {
    return false;
  }
}
export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        checkLoggedIn() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};
