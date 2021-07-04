import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthRes from "./AuthRes";


export const ProtectedRouteRes =({
    component: Component,
    ...rest
  }) => {
    return (
      <Route
        {...rest}
        render={props => {
          if (AuthRes.isAuthenticated()) {
            return <Component {...props} />;
          } else {
            return (
              <Redirect
                to={{
                  pathname: "/",
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