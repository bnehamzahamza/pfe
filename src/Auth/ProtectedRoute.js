import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthEmp from "./AuthEmp";

export const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (AuthEmp.isAuthenticated()) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login-emp",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
