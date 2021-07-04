import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthSc from "./AuthSc";


export const ProtectedRouteSc =({
    component: Component,
    ...rest
  }) => {
    return (
      <Route
        {...rest}
        render={props => {
          if (AuthSc.isAuthenticated()) {
            return <Component {...props} />;
          } else {
            return (
              <Redirect
                to={{
                  pathname: "/login-sc",
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